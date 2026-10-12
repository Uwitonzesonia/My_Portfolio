// Vercel serverless function: POST /api/chat
// Answers visitor questions about Sonia using Google Gemini, grounded in the content saved from the admin page
// (or the defaults in src/data/profile.js).
// Requires the GEMINI_API_KEY environment variable (set it in Vercel → Project → Settings → Environment Variables).
// Optional: GEMINI_MODEL to use a different Gemini model.
import { GoogleGenAI, ApiError, ThinkingLevel } from '@google/genai';
import { buildKnowledgeBase } from '../src/data/profile.js';
import { loadContent } from './_lib/store.js';

// Main model, then a lighter backup used when the main one is busy or too slow
const MODELS = [process.env.GEMINI_MODEL || 'gemini-3.8-flash', 'gemini-flash-lite-latest'];
const ATTEMPT_TIMEOUT_MS = 15000; // per model; normally Gemini answers in a few seconds
const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;

const systemPrompt = (content, profile = content.profile) => `You are the AI assistant on ${profile.name}'s portfolio website. You speak about Sonia in the third person ("Sonia built…"), warmly and professionally, to recruiters, clients and other visitors.

Answer only from the profile below. If something isn't covered, say you don't have that detail and suggest contacting Sonia at ${profile.email} or on LinkedIn. Never invent projects, employers, dates, grades or prices.

Keep answers short: 2–5 sentences, or a few short "- " bullet lines when listing things. Plain text only — no markdown headings, bold or tables. Include full URLs when pointing to a project, LinkedIn, GitHub or the CV. Reply in the visitor's language (English, French, Kinyarwanda or Swahili). If asked something unrelated to Sonia or her work, politely steer back.

<profile>
${buildKnowledgeBase(content)}
</profile>`;

let ai; // created on first request so a missing key returns 503 instead of crashing

// Keeps the last few turns, trims long messages, and converts them to Gemini's format
// (Gemini calls the assistant role "model").
function toGeminiContents(raw) {
  if (!Array.isArray(raw)) return null;
  const msgs = raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES);
  // The conversation must start with a user turn
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length) return null;
  return msgs.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content.slice(0, MAX_CHARS) }],
  }));
}

export async function POST(request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: 'AI is not configured' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const contents = toGeminiContents(body?.messages);
  if (!contents) {
    return Response.json({ error: 'No question provided' }, { status: 400 });
  }

  const content = await loadContent();
  const { profile } = content;

  ai ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: systemPrompt(content),
          maxOutputTokens: 2000,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }, // short factual answers — keeps it fast and cheap
          abortSignal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
        },
      });

      const reply = response.text?.trim();
      return Response.json({
        reply: reply || `Sorry, I can't answer that one. I'm happy to tell you about Sonia's projects, skills, or how to contact her at ${profile.email}.`,
      });
    } catch (error) {
      // Busy (429/503), server trouble (5xx) or too slow → try the backup model
      const retryable = error.name === 'TimeoutError' || error.name === 'AbortError' ||
        (error instanceof ApiError && (error.status === 429 || error.status >= 500));
      console.error(`Gemini ${model} failed${retryable ? ' (trying backup)' : ''}:`, error.status ?? error.name, error.message);
      if (!retryable) break;
    }
  }

  // Every attempt failed — the chat widget will answer from the portfolio content instead
  return Response.json({ error: 'AI service unavailable' }, { status: 502 });
}

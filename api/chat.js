// Vercel serverless function: POST /api/chat
// Answers visitor questions about Sonia using Claude, grounded in the content saved from the admin page
// (or the defaults in src/data/profile.js).
// Requires the ANTHROPIC_API_KEY environment variable (set it in Vercel → Project → Settings → Environment Variables).
import Anthropic from '@anthropic-ai/sdk';
import { buildKnowledgeBase } from '../src/data/profile.js';
import { loadContent } from './_lib/store.js';

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;

const systemPrompt = (content, profile = content.profile) => `You are the AI assistant on ${profile.name}'s portfolio website. You speak about Sonia in the third person ("Sonia built…"), warmly and professionally, to recruiters, clients and other visitors.

Answer only from the profile below. If something isn't covered, say you don't have that detail and suggest contacting Sonia at ${profile.email} or on LinkedIn. Never invent projects, employers, dates, grades or prices.

Keep answers short: 2–5 sentences, or a few short "- " bullet lines when listing things. Plain text only — no markdown headings, bold or tables. Include full URLs when pointing to a project, LinkedIn, GitHub or the CV. Reply in the visitor's language (English, French, Kinyarwanda or Swahili). If asked something unrelated to Sonia or her work, politely steer back.

<profile>
${buildKnowledgeBase(content)}
</profile>`;

let client; // created on first request so a missing key returns 503 instead of crashing

function cleanMessages(raw) {
  if (!Array.isArray(raw)) return null;
  const msgs = raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  // The conversation must start with a user turn
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  return msgs.length ? msgs : null;
}

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'AI is not configured' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const messages = cleanMessages(body?.messages);
  if (!messages) {
    return Response.json({ error: 'No question provided' }, { status: 400 });
  }

  const content = await loadContent();
  const { profile } = content;

  try {
    client ??= new Anthropic(); // reads ANTHROPIC_API_KEY
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 2000,
      output_config: { effort: 'low' }, // short factual answers — low effort keeps it fast and cheap
      cache_control: { type: 'ephemeral' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: systemPrompt(content),
      messages,
    });

    if (response.stop_reason === 'refusal') {
      return Response.json({ reply: `I can't help with that one, but I'm happy to tell you about Sonia's projects, skills or how to contact her.` });
    }

    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    return Response.json({ reply: reply || `Sorry, I couldn't come up with an answer. You can reach Sonia at ${profile.email}.` });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: 'Too many requests, try again shortly' }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}:`, error.message);
      return Response.json({ error: 'AI service error' }, { status: 502 });
    }
    console.error('Chat error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

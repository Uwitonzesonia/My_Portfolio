import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { answerLocally } from '../data/localAnswers';
import { useContent } from '../data/ContentContext';

const suggestions = [
  'Who is Sonia?',
  'What projects has she built?',
  'What are her skills?',
  'How can I contact her?',
  'Can I see her CV?',
];

const greeting = {
  role: 'assistant',
  content: "Hi! 👋 I'm Sonia's AI assistant. Ask me anything about her projects, skills, experience or how to work with her.",
};

// Open the chat from anywhere: openAssistant('Tell me about X')
export const openAssistant = (question) =>
  window.dispatchEvent(new CustomEvent('open-assistant', { detail: question }));

// Turn URLs and site file paths (like the CV) in replies into clickable links
const Linkified = ({ text }) =>
  text.split(/(https?:\/\/[^\s)]+|\/[\w\-./]+\.pdf(?:\?[\w=]+)?)/g).map((part, i) =>
    /^(https?:\/\/|\/[\w\-./]+\.pdf)/.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer" className="text-brand-light underline break-all">{part}</a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const ChatAssistant = () => {
  const content = useContent();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const ask = async (question) => {
    const text = question.trim();
    if (!text || loading) return;
    const history = [...messagesRef.current, { role: 'user', content: text }];
    setMessages(history);
    setInput('');
    setLoading(true);

    let reply;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Skip the canned greeting; the API expects the conversation to start with the visitor
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      reply = (await res.json()).reply;
    } catch {
      reply = answerLocally(text, content); // AI unavailable → answer from profile data
    }
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  // Listen for "Ask AI" buttons elsewhere on the page
  useEffect(() => {
    const handler = (e) => {
      setOpen(true);
      if (e.detail) ask(e.detail);
    };
    window.addEventListener('open-assistant', handler);
    return () => window.removeEventListener('open-assistant', handler);
  });

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-brand text-white pl-4 pr-5 py-3 rounded-full font-semibold shadow-xl shadow-brand/40"
            aria-label="Open AI assistant"
          >
            <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-30" />
            <Bot size={22} className="relative" />
            <span className="relative hidden sm:inline">Ask my AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed z-50 bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[380px] h-[85vh] sm:h-[560px] flex flex-col bg-ink-900 border border-white/10 sm:rounded-2xl shadow-2xl shadow-brand/20 overflow-hidden"
            role="dialog"
            aria-label="Sonia's AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-dark to-brand">
              <div className="flex items-center gap-3">
                <div className="relative p-2 bg-white/15 rounded-full">
                  <Bot size={20} className="text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-brand" />
                </div>
                <div>
                  <p className="font-bold text-white leading-tight">Sonia's AI Assistant</p>
                  <p className="text-xs text-white/80 flex items-center gap-1"><Sparkles size={11} /> Knows her CV, projects & skills</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-white/15 text-white" aria-label="Close assistant">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-brand text-white rounded-br-sm'
                        : 'bg-ink-800 text-gray-200 border border-white/10 rounded-bl-sm'
                    }`}
                  >
                    <Linkified text={m.content} />
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-ink-800 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 bg-brand-light rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-brand/40 text-brand-light hover:bg-brand hover:text-white hover:border-brand transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="p-3 border-t border-white/10 flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                placeholder="Ask about Sonia…"
                className="flex-1 bg-ink border border-white/10 text-white placeholder-gray-500 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-brand text-white rounded-full hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;

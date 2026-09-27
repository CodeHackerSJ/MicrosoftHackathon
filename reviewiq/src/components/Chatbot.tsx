'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { MessageSquare, X, Send, Sparkles, Bot, User, RotateCcw, Copy, Check } from 'lucide-react';
import { chatbotResponses } from '@/data/mockData';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const { chatbotOpen, toggleChatbot } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content:
        "Hello. I'm **ReviewIQ Copilot**, your enterprise review analytics assistant. You can ask me to analyze churn drivers, summarize customer pain points, or generate marketing copy from authentic user feedback.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const userMsg: Message = { id: Date.now(), role: 'user', content: userText };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    const lower = userText.toLowerCase();
    let response = chatbotResponses.default;
    for (const [key, val] of Object.entries(chatbotResponses)) {
      if (key !== 'default' && lower.includes(key.split(' ').slice(0, 3).join(' '))) {
        response = val;
        break;
      }
    }
    if (lower.includes('negative') || lower.includes('increasing') || lower.includes('drop')) {
      response = chatbotResponses['why are negative reviews increasing'];
    } else if (lower.includes('prioritize') || lower.includes('priority') || lower.includes('fix')) {
      response = chatbotResponses['which issue should our product team prioritize'];
    } else if (lower.includes('marketing') || lower.includes('campaign')) {
      response = chatbotResponses['give me marketing insights'];
    } else if (lower.includes('feature') || lower.includes('want') || lower.includes('request')) {
      response = chatbotResponses['what features do customers want'];
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'assistant', content: response }]);
    }, 900);
  };

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        content: "Session cleared. How can I help you analyze your customer reviews?",
      },
    ]);
  };

  const quickPrompts = [
    'Why are negative reviews increasing?',
    'Which issue should our product team prioritize?',
    'Give me marketing insights from reviews',
    'What features do customers request most?',
  ];

  if (!chatbotOpen) {
    return (
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
        aria-label="Open ReviewIQ Copilot"
      >
        <Sparkles size={16} />
        <span className="text-xs font-semibold tracking-wide">ReviewIQ Copilot</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] rounded-xl border border-[var(--border-card)] bg-[var(--bg-elevated)] shadow-2xl flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-app)] bg-[var(--bg-card)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--purple-bg)] border border-[var(--purple-border)] flex items-center justify-center text-[var(--purple-text)]">
            <Bot size={15} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-[var(--text-primary)]">
                ReviewIQ Copilot
              </h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--purple-bg)] text-[var(--purple-text)] font-semibold">
                AI 4.5
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">
              Enterprise Customer Intelligence Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            title="Reset conversation"
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={toggleChatbot}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            title="Close"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[var(--bg-app)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.role === 'assistant'
                  ? 'bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)]'
                  : 'bg-[var(--primary-600)] text-white'
              }`}
            >
              {msg.role === 'assistant' ? <Bot size={12} /> : <User size={12} />}
            </div>
            <div
              className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed border relative group ${
                msg.role === 'assistant'
                  ? 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-card)] shadow-sm'
                  : 'bg-[var(--primary-600)] text-white border-transparent'
              }`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                className="space-y-1.5"
              />
              {msg.role === 'assistant' && (
                <button
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className="absolute right-2 bottom-1.5 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] transition-opacity"
                  title="Copy text"
                >
                  {copiedId === msg.id ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)] flex items-center justify-center shrink-0">
              <Bot size={12} />
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-lg px-3 py-2 text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-500)] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-500)] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-500)] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Synthesizing feedback telemetry...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
        <div className="px-3 py-2 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => {
                setInput(p);
              }}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-card-subtle)] hover:bg-[var(--primary-50)] text-[var(--text-secondary)] hover:text-[var(--primary-600)] border border-[var(--border-app)] transition-colors text-left"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="p-3 border-t border-[var(--border-app)] bg-[var(--bg-card)]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about churn, sentiment, or features..."
            className="flex-1 px-3 py-2 rounded-lg text-xs saas-input placeholder:text-[var(--text-tertiary)]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\n/g, '<br/>');
}

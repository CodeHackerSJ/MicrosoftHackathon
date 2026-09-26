'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
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
      content: "Hi! I'm **ReviewIQ Copilot**. I can help you understand your customer feedback data. Try asking me about complaints, sentiment trends, or marketing insights.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    // Find best matching response
    const lower = input.toLowerCase();
    let response = chatbotResponses.default;
    for (const [key, val] of Object.entries(chatbotResponses)) {
      if (key !== 'default' && lower.includes(key.split(' ').slice(0, 3).join(' '))) {
        response = val;
        break;
      }
    }
    // Additional keyword matching
    if (lower.includes('negative') || lower.includes('increasing')) response = chatbotResponses['why are negative reviews increasing'];
    else if (lower.includes('prioritize') || lower.includes('priority') || lower.includes('fix first')) response = chatbotResponses['which issue should our product team prioritize'];
    else if (lower.includes('marketing') || lower.includes('campaign')) response = chatbotResponses['give me marketing insights'];
    else if (lower.includes('feature') || lower.includes('want') || lower.includes('request')) response = chatbotResponses['what features do customers want'];

    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'assistant', content: response }]);
    }, 1200);
  };

  const quickPrompts = [
    'Why are negative reviews increasing?',
    'Which issue should our product team prioritize?',
    'Give me marketing insights',
  ];

  if (!chatbotOpen) {
    return (
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full ai-gradient shadow-lg shadow-electric-500/20 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open ReviewIQ Copilot"
      >
        <MessageSquare size={22} className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[560px] rounded-xl bg-navy-900 border border-white/10 shadow-2xl shadow-black/40 flex flex-col overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-navy-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">ReviewIQ Copilot</h3>
            <p className="text-[10px] text-slate-500">AI-powered review intelligence</p>
          </div>
        </div>
        <button onClick={toggleChatbot} className="p-1.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'ai-gradient' : 'bg-navy-600'
            }`}>
              {msg.role === 'assistant' ? <Bot size={12} className="text-white" /> : <User size={12} className="text-slate-300" />}
            </div>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                msg.role === 'assistant'
                  ? 'bg-navy-800 text-slate-200 border border-white/5'
                  : 'bg-electric-500/15 text-slate-200 border border-electric-500/20'
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full ai-gradient flex items-center justify-center shrink-0">
              <Bot size={12} className="text-white" />
            </div>
            <div className="bg-navy-800 border border-white/5 rounded-lg px-3 py-2">
              <div className="animate-typing flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => {
                setInput(p);
              }}
              className="text-[10px] px-2.5 py-1 rounded-full bg-navy-800 text-slate-400 hover:text-electric-400 hover:bg-electric-500/10 border border-white/5 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2 bg-navy-800 rounded-lg px-3 py-2 border border-white/5 focus-within:border-electric-500/30 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your reviews..."
            className="flex-1 bg-transparent text-xs text-slate-200 placeholder-slate-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-1.5 rounded-md bg-electric-500 text-white hover:bg-electric-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-100 font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

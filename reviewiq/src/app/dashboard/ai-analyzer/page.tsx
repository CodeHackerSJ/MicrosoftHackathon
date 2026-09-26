'use client';

import React from 'react';
import { aiAnalyzerResponses } from '@/data/mockData';
import { Bot, Sparkles, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

export default function AIAnalyzerPage() {
  const [query, setQuery] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [response, setResponse] = React.useState<typeof aiAnalyzerResponses['default'] | null>(null);

  const handleAnalyze = () => {
    if (!query) return;
    setIsAnalyzing(true);
    setResponse(null);
    
    setTimeout(() => {
      const lower = query.toLowerCase();
      let res = aiAnalyzerResponses.default;
      if (lower.includes('complain') || lower.includes('problem')) res = aiAnalyzerResponses.complaints;
      else if (lower.includes('sentiment') || lower.includes('drop')) res = aiAnalyzerResponses.sentiment;
      else if (lower.includes('feature') || lower.includes('want')) res = aiAnalyzerResponses.features;
      else if (lower.includes('churn')) res = aiAnalyzerResponses.churn;
      else if (lower.includes('priorit') || lower.includes('fix')) res = aiAnalyzerResponses.priority;
      
      setResponse(res);
      setIsAnalyzing(false);
    }, 1500);
  };

  const sampleQueries = [
    "What are customers complaining about the most?",
    "Why did sentiment drop this month?",
    "What features do customers want?",
    "Which complaints could increase churn?",
    "What should the product team prioritize?"
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <header className="text-center mb-10 mt-6">
        <div className="w-16 h-16 mx-auto rounded-2xl ai-gradient flex items-center justify-center shadow-lg shadow-electric-500/20 mb-4">
           <Bot size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-50 tracking-tight">AI Review Analyst</h1>
        <p className="text-slate-400 mt-2">Ask complex questions about your customer feedback in natural language.</p>
      </header>

      <div className="glass-card rounded-2xl p-2 flex items-center shadow-xl">
         <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="e.g., What are the main reasons for 1-star reviews on the iOS app?"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none"
         />
         <button 
           onClick={handleAnalyze}
           disabled={!query || isAnalyzing}
           className="px-6 py-3 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
         >
            {isAnalyzing ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Sparkles size={16} />}
            Analyze
         </button>
      </div>

      {!response && !isAnalyzing && (
         <div className="mt-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">Suggested Queries</p>
            <div className="flex flex-wrap justify-center gap-2">
               {sampleQueries.map((q, i) => (
                  <button 
                     key={i}
                     onClick={() => { setQuery(q); handleAnalyze(); }}
                     className="px-4 py-2 rounded-full bg-navy-800 border border-white/5 text-sm text-slate-300 hover:bg-navy-700 hover:text-white hover:border-white/10 transition-all"
                  >
                     {q}
                  </button>
               ))}
            </div>
         </div>
      )}

      {isAnalyzing && (
         <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="w-12 h-12 rounded-full ai-gradient animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
               <Sparkles size={20} className="text-white animate-spin-slow" />
            </div>
            <p className="text-sm font-medium">Synthesizing thousands of reviews...</p>
         </div>
      )}

      {response && !isAnalyzing && (
         <div className="mt-8 animate-slide-left">
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-electric-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Bot size={120} />
               </div>
               
               <h3 className="text-sm font-bold text-electric-400 flex items-center gap-2 mb-4 uppercase tracking-wider">
                  <Sparkles size={16} /> AI Insight
               </h3>
               
               <div className="prose prose-invert max-w-none mb-8 text-sm text-slate-200 leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: response.answer.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} 
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-6">
                  <div>
                     <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                        <AlertCircle size={14} /> Supporting Evidence
                     </h4>
                     <ul className="space-y-2">
                        {response.evidence.map((e, i) => (
                           <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-navy-800/50 p-2 rounded border border-white/5">
                              <span className="text-electric-400 mt-0.5">•</span> {e}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div>
                     <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                        <CheckCircle size={14} /> Recommended Action
                     </h4>
                     <ul className="space-y-2">
                        {response.recommendations.map((r, i) => (
                           <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-success-500/10 p-2 rounded border border-success-500/10">
                              <span className="text-success-400 mt-0.5">→</span> {r}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { reviews, applications } from '@/data/mockData';
import { Search, Filter, Star, ChevronDown } from 'lucide-react';

export default function ReviewExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Minimal filtering for demonstration
  const filteredReviews = reviews.filter(r => 
    r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.themes.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 h-full flex flex-col animate-fade-in">
      <header>
        <h1 className="text-2xl font-bold text-slate-50">Review Explorer</h1>
        <p className="text-slate-400 mt-1">Search, filter, and analyze individual customer reviews.</p>
      </header>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search reviews by keyword, theme, or user..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-navy-800 border border-white/10 rounded-lg text-sm text-slate-200 outline-none focus:border-electric-500/50 transition-colors"
          />
        </div>
        <button className="px-4 py-2 bg-navy-800 border border-white/10 rounded-lg flex items-center gap-2 text-sm text-slate-300 hover:bg-navy-700 transition-colors">
          <Filter size={14} /> Filters
        </button>
      </div>

      <div className="flex gap-2 text-xs mb-2">
         {['All', '5 Stars', '1-2 Stars', 'High Churn Risk', 'Payment Issues'].map(f => (
            <span key={f} className="px-3 py-1 rounded-full bg-navy-800 border border-white/5 text-slate-400 cursor-pointer hover:bg-navy-700 hover:text-slate-200 transition-colors">
               {f}
            </span>
         ))}
      </div>

      <div className="flex-1 overflow-auto space-y-4 pb-10">
         {filteredReviews.map(review => {
           const app = applications.find(a => a.id === review.appId);
           return (
             <div key={review.id} className="glass-card rounded-xl p-5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                         {Array.from({length: 5}).map((_, i) => (
                           <Star key={i} size={14} className={i < review.rating ? 'fill-warning-400 text-warning-400' : 'text-slate-700'} />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-slate-300">{review.userName}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-500">{review.date}</span>
                   </div>
                   <div className="flex gap-2">
                      <span className="text-[10px] px-2 py-0.5 bg-navy-800 rounded border border-white/5 text-slate-400">{app?.name} ({review.platform}) v{review.version}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                         review.sentiment === 'positive' ? 'bg-success-500/10 text-success-400' : 
                         review.sentiment === 'negative' ? 'bg-danger-500/10 text-danger-400' : 
                         'bg-slate-700/50 text-slate-300'
                      }`}>
                         {review.sentiment}
                      </span>
                   </div>
                </div>
                
                <p className="text-sm text-slate-200 leading-relaxed mb-4">
                  "{review.text}"
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                   <div className="flex gap-2 items-center">
                     <span className="text-xs text-slate-500">AI Detected Themes:</span>
                     {review.themes.length > 0 ? review.themes.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-electric-500/10 text-electric-400 rounded-full border border-electric-500/20">
                          {t}
                        </span>
                     )) : <span className="text-[10px] text-slate-500 italic">None detected</span>}
                   </div>
                   <div className="flex gap-2 items-center">
                      <span className="text-xs text-slate-500">Churn Risk:</span>
                      <span className={`text-xs font-semibold ${
                         review.churnRisk === 'high' ? 'text-danger-400' :
                         review.churnRisk === 'medium' ? 'text-warning-400' : 'text-success-400'
                      }`}>
                         {review.churnRisk.toUpperCase()}
                      </span>
                   </div>
                </div>
             </div>
           )
         })}
      </div>
    </div>
  );
}

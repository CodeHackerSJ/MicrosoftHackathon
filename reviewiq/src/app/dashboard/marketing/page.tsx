'use client';

import React from 'react';
import { marketingIntelligence } from '@/data/mockData';
import { Megaphone, Target, MessageCircle, Lightbulb } from 'lucide-react';

export default function MarketingIntelligencePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <Megaphone size={28} className="text-purple-400" /> Marketing Intelligence
        </h1>
        <p className="text-slate-400 mt-1">Discover what resonates with your audience and craft data-driven campaigns.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Customer Language */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <MessageCircle size={18} className="text-cyan-400" /> Voice of Customer
            </h3>
            <p className="text-xs text-slate-400 mb-4">Keywords customers naturally use when praising your product.</p>
            <div className="flex flex-wrap gap-2 mb-6">
               {marketingIntelligence.keywords.slice(0, 10).map((kw, i) => (
                  <div key={i} className="px-3 py-1.5 bg-navy-800 border border-white/10 rounded-lg flex items-center gap-2">
                     <span className="text-sm font-medium text-slate-200">{kw.word}</span>
                     <span className="text-[10px] text-slate-500">{kw.count}</span>
                  </div>
               ))}
            </div>

            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Key Strengths Mentioned</h4>
            <div className="space-y-3">
               {marketingIntelligence.strengths.slice(0, 3).map((item, i) => (
                  <div key={i} className="p-3 bg-navy-800/50 rounded-lg border border-white/5 border-l-2 border-l-cyan-500">
                     <div className="font-medium text-slate-200 text-sm mb-1">{item.keyword}</div>
                     <div className="text-xs text-slate-400 italic">"{item.quote}"</div>
                  </div>
               ))}
            </div>
         </div>

         {/* Campaign Opportunities */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <Lightbulb size={18} className="text-warning-400" /> Campaign Opportunities
            </h3>
            <div className="space-y-4">
               {marketingIntelligence.campaigns.map((camp, i) => (
                  <div key={i} className="p-4 bg-navy-800/50 rounded-lg border border-white/5">
                     <div className="text-[10px] text-electric-400 uppercase tracking-wider font-bold mb-1">{camp.title}</div>
                     <div className="text-lg font-bold text-white mb-2 leading-tight">"{camp.message}"</div>
                     <div className="text-xs text-slate-400 mb-3">{camp.basis}</div>
                     <div className="text-[10px] text-slate-500 bg-navy-900 px-2 py-1 rounded inline-block">
                        Target: {camp.audience}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Audience Signals */}
         <div className="glass-card rounded-xl p-5 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <Target size={18} className="text-electric-400" /> Target Audience Signals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {marketingIntelligence.audienceSegments.map((seg, i) => (
                  <div key={i} className="p-4 bg-navy-800/50 rounded-xl border border-white/5 text-center">
                     <div className="text-3xl font-bold text-electric-400 mb-1">{seg.percentage}%</div>
                     <div className="text-sm font-semibold text-slate-200 mb-2">{seg.segment}</div>
                     <div className="text-[10px] text-slate-400 bg-navy-900 px-2 py-1 rounded mx-auto inline-block">
                        {seg.topConcern}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

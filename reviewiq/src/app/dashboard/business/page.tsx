'use client';

import React from 'react';
import { businessInsights } from '@/data/mockData';
import { Briefcase, TrendingUp, AlertOctagon, ThumbsUp, Zap, Radio } from 'lucide-react';

export default function BusinessInsightsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <Briefcase size={28} className="text-electric-400" /> Business Insights
        </h1>
        <p className="text-slate-400 mt-1">Strategic intelligence derived from customer feedback.</p>
      </header>

      <div className="glass-card rounded-xl p-6 border-l-4 border-l-electric-500 mb-8">
         <h2 className="text-sm font-bold text-electric-400 uppercase tracking-wider mb-2">Executive Summary</h2>
         <p className="text-slate-200 leading-relaxed text-sm">
            Payment failures are currently the largest customer pain point and may negatively impact retention.
            Customers strongly value the simplified onboarding experience and AI features.
            Demand for dark mode has increased 31% over the last quarter, presenting a high-ROI satisfaction opportunity.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Pain Points */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <AlertOctagon size={18} className="text-danger-400" /> Customer Pain Points
            </h3>
            <div className="space-y-3">
               {businessInsights.painPoints.map((item, i) => (
                  <div key={i} className="p-3 bg-navy-800/50 rounded-lg border border-white/5">
                     <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-slate-200 text-sm">{item.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${item.severity === 'critical' ? 'bg-danger-500/20 text-danger-400' : item.severity === 'high' ? 'bg-warning-500/20 text-warning-400' : 'bg-electric-500/20 text-electric-400'}`}>
                           {item.severity}
                        </span>
                     </div>
                     <p className="text-xs text-slate-400 mb-2">{item.description}</p>
                     <div className="text-[10px] text-danger-400 font-medium">↑ {item.trend}% increase</div>
                  </div>
               ))}
            </div>
         </div>

         {/* Feature Requests */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <Zap size={18} className="text-electric-400" /> Feature Requests
            </h3>
            <div className="space-y-3">
               {businessInsights.featureRequests.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-navy-800/50 rounded-lg border border-white/5">
                     <span className="font-medium text-slate-200 text-sm">{item.feature}</span>
                     <div className="text-right">
                        <div className="text-sm font-bold text-slate-100">{item.demand} <span className="text-[10px] font-normal text-slate-400">mentions</span></div>
                        <div className="text-[10px] text-success-400 font-medium">↑ {item.growth}% growth</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Product Strengths */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <ThumbsUp size={18} className="text-success-400" /> Product Strengths
            </h3>
            <div className="space-y-3">
               {businessInsights.strengths.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-navy-800/50 rounded-lg border border-white/5">
                     <span className="font-medium text-slate-200 text-sm">{item.title}</span>
                     <div className="text-right">
                        <div className="text-sm font-bold text-success-400">{item.score}% <span className="text-[10px] font-normal text-slate-400">CSAT</span></div>
                        <div className="text-[10px] text-slate-500">{item.mentions.toLocaleString()} mentions</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Emerging Issues */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
               <Radio size={18} className="text-warning-400" /> Emerging Signals
            </h3>
            <div className="space-y-3">
               {businessInsights.emergingIssues.map((item, i) => (
                  <div key={i} className="p-3 bg-navy-800/50 rounded-lg border border-white/5">
                     <div className="font-medium text-slate-200 text-sm mb-1">{item.issue}</div>
                     <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Detected: {item.firstDetected}</span>
                        <span className="text-warning-400 font-medium">{item.velocity}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

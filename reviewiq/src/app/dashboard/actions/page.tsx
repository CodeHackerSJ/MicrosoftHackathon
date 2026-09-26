'use client';

import React from 'react';
import { actionItems } from '@/data/mockData';
import { CheckSquare, AlertCircle, Clock, Users, ArrowRight } from 'lucide-react';

export default function ActionCenterPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
              <CheckSquare size={28} className="text-success-400" /> Action Center
           </h1>
           <p className="text-slate-400 mt-1">AI-generated recommendations translated into actionable tasks.</p>
        </div>
        <button className="px-4 py-2 bg-electric-500 hover:bg-electric-400 text-white text-sm font-medium rounded-lg transition-colors">
           Export to Jira
        </button>
      </header>

      <div className="space-y-4">
         {actionItems.map((action) => (
            <div key={action.id} className="glass-card rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                        action.priority === 'critical' ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30' :
                        action.priority === 'high' ? 'bg-warning-500/20 text-warning-400 border border-warning-500/30' :
                        'bg-electric-500/20 text-electric-400 border border-electric-500/30'
                     }`}>
                        {action.priority} Priority
                     </span>
                     <span className="text-[10px] text-slate-500 font-medium bg-navy-800 px-2 py-0.5 rounded border border-white/5">
                        {action.team}
                     </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">{action.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{action.description}</p>
                  
                  <div className="flex gap-4 mt-4">
                     <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Users size={14} className="text-slate-500" /> {action.mentions.toLocaleString()} Mentions
                     </div>
                     <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <AlertCircle size={14} className={action.churnRisk === 'high' ? 'text-danger-400' : 'text-slate-500'} /> 
                        Churn Risk: <span className="capitalize">{action.churnRisk}</span>
                     </div>
                  </div>
               </div>
               
               <div className="flex flex-col gap-2 min-w-[140px]">
                  <button className="px-4 py-2 bg-navy-800 hover:bg-navy-700 border border-white/10 rounded-lg text-sm text-slate-200 transition-colors text-center w-full">
                     Assign Team
                  </button>
                  <button className="px-4 py-2 bg-electric-500/10 hover:bg-electric-500/20 border border-electric-500/20 text-electric-400 rounded-lg text-sm transition-colors text-center w-full">
                     Create Task
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}

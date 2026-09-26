'use client';

import React from 'react';
import { TrendingUp, Activity, BarChart, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function TrendsAndDriftPage() {
  const driftData = Array.from({length: 12}).map((_, i) => ({
    period: `Week ${i+1}`,
    paymentComplaints: 20 + Math.random() * 10 + (i > 8 ? 25 : 0),
    crashReports: 15 + Math.random() * 5 + (i > 8 ? 15 : 0),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <TrendingUp size={28} className="text-electric-400" /> Trend & Drift Analysis
        </h1>
        <p className="text-slate-400 mt-1">Monitor shifts in sentiment, themes, and review volume over time.</p>
      </header>

      <div className="glass-card rounded-xl p-6 border-l-4 border-l-warning-500 mb-8">
         <h2 className="text-sm font-bold text-warning-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Activity size={16} /> Significant Drift Detected
         </h2>
         <p className="text-slate-200 leading-relaxed text-sm">
            <strong>Payment complaints increased 24%</strong> compared with the previous period, starting precisely around Week 9. This correlates with the v4.2 release and represents a significant negative drift in the "Transaction" theme.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-6">Theme Volume Drift</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={driftData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="period" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0F1C2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                     />
                     <Line type="monotone" dataKey="paymentComplaints" stroke="#F59E0B" strokeWidth={3} dot={false} name="Payment Complaints" />
                     <Line type="monotone" dataKey="crashReports" stroke="#EF4444" strokeWidth={3} dot={false} name="Crash Reports" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="glass-card rounded-xl p-5 flex flex-col justify-center items-center text-center">
             <BarChart size={48} className="text-slate-500 mb-4 opacity-50" />
             <h3 className="text-lg font-semibold text-slate-300 mb-2">Rating Drift Analysis</h3>
             <p className="text-sm text-slate-500 max-w-sm mb-4">
               Monitor how average ratings change over time to detect gradual product degradation.
             </p>
             <button className="text-sm text-electric-400 hover:text-electric-300 flex items-center gap-1 font-medium">
               Configure Alert Thresholds <ArrowRight size={14} />
             </button>
         </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { sentimentTrends, ratingDistribution } from '@/data/mockData';
import { BarChart3 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export default function SentimentAnalysisPage() {
  const pieData = [
    { name: 'Positive', value: 72, color: '#22C55E' },
    { name: 'Neutral', value: 16, color: '#06B6D4' },
    { name: 'Negative', value: 12, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <BarChart3 size={28} className="text-cyan-400" /> Sentiment Analysis
        </h1>
        <p className="text-slate-400 mt-1">Deep dive into customer sentiment and rating distributions.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Sentiment Distribution */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Overall Sentiment</h3>
            <div className="h-[250px] relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0F1C2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#F8FAFC' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-white">72%</span>
                  <span className="text-[10px] text-slate-400 uppercase">Positive</span>
               </div>
            </div>
            <div className="flex justify-center gap-4 mt-2">
               {pieData.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                     <span className="text-slate-300">{d.name}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Rating Distribution */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-6">Rating Distribution</h3>
            <div className="space-y-4">
               {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                     <div className="w-10 text-xs text-slate-400 font-medium">{rating.stars} ★</div>
                     <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden">
                        <div 
                           className={`h-full rounded-full ${rating.stars >= 4 ? 'bg-success-500' : rating.stars === 3 ? 'bg-warning-500' : 'bg-danger-500'}`}
                           style={{ width: `${rating.percent}%` }}
                        />
                     </div>
                     <div className="w-12 text-right text-xs font-semibold text-slate-300">{rating.percent}%</div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Sentiment Trend */}
      <div className="glass-card rounded-xl p-5 h-[400px]">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-100">Sentiment Trend (30 Days)</h3>
         </div>
         <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={sentimentTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
               <defs>
                  <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNu" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNe" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                     <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
               <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
               <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
               <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1C2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
               />
               <Area type="monotone" dataKey="positive" stackId="1" stroke="#22C55E" fill="url(#colorP)" />
               <Area type="monotone" dataKey="neutral" stackId="1" stroke="#06B6D4" fill="url(#colorNu)" />
               <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF4444" fill="url(#colorNe)" />
            </AreaChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
}

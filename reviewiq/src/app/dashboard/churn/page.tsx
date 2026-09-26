'use client';

import React from 'react';
import { churnFactors, churnTrend } from '@/data/mockData';
import KpiCard from '@/components/KpiCard';
import { Users, AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

export default function ChurnIntelligencePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <Users size={28} className="text-warning-400" /> Customer Churn Intelligence
        </h1>
        <p className="text-slate-400 mt-1">
           Identify high-risk users and the underlying issues driving them away. <br/>
           <span className="text-xs italic text-slate-500">*Churn Risk estimates the likelihood that dissatisfied customers may stop using the application.</span>
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Overall Churn Risk" value="8.6%" trend={1.2} color="warning" icon={<AlertTriangle size={18} />} />
        <div className="glass-card rounded-xl p-5 border-t-2 border-t-danger-500">
           <div className="text-xs text-slate-400 uppercase font-semibold mb-1">High Risk</div>
           <div className="text-2xl font-bold text-danger-400">1,243</div>
           <div className="text-[10px] text-slate-500 mt-1">Users requiring immediate action</div>
        </div>
        <div className="glass-card rounded-xl p-5 border-t-2 border-t-warning-500">
           <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Medium Risk</div>
           <div className="text-2xl font-bold text-warning-400">2,891</div>
           <div className="text-[10px] text-slate-500 mt-1">Users showing dissatisfaction</div>
        </div>
        <div className="glass-card rounded-xl p-5 border-t-2 border-t-success-500">
           <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Low Risk</div>
           <div className="text-2xl font-bold text-success-400">8,321</div>
           <div className="text-[10px] text-slate-500 mt-1">Stable, satisfied users</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
         {/* Churn Risk by Theme */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-6">Top Churn Drivers (Impact Score)</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={churnFactors} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis type="number" stroke="#64748B" fontSize={10} domain={[0, 100]} />
                     <YAxis dataKey="factor" type="category" stroke="#94A3B8" fontSize={11} width={120} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0F1C2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#F8FAFC' }}
                        cursor={{fill: 'rgba(255,255,255,0.02)'}}
                     />
                     <Bar dataKey="impact" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Churn Trend */}
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-6">Churn Risk vs Satisfaction (12 Weeks)</h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={churnTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="week" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis yAxisId="left" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} domain={[0, 15]} />
                     <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} domain={[60, 100]} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0F1C2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                     />
                     <Line yAxisId="left" type="monotone" dataKey="churnRisk" stroke="#F59E0B" strokeWidth={3} dot={{r: 4, fill: '#F59E0B', strokeWidth: 0}} name="Churn Risk %" />
                     <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#22C55E" strokeWidth={3} dot={{r: 4, fill: '#22C55E', strokeWidth: 0}} name="Satisfaction Score" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
}

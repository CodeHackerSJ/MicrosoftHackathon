'use client';

import React from 'react';
import Link from 'next/link';
import { applications } from '@/data/mockData';
import { Star, Smartphone, Apple } from 'lucide-react';

export default function ApplicationsPage() {
  const androidApps = applications.filter(a => a.platform === 'android');
  const iosApps = applications.filter(a => a.platform === 'ios');

  const AppCard = ({ app }: { app: typeof applications[0] }) => (
    <Link href={`/dashboard/applications/${app.id}`} className="block">
      <div className="glass-card-hover rounded-xl p-5 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-2xl border border-white/10 shadow-lg">
                {app.icon}
             </div>
             <div>
               <h3 className="text-base font-bold text-slate-100">{app.name}</h3>
               <p className="text-xs text-slate-400">{app.category}</p>
             </div>
          </div>
          <div className={`p-1.5 rounded-md ${app.platform === 'android' ? 'bg-success-500/10 text-success-400' : 'bg-slate-700/50 text-slate-300'}`}>
             {app.platform === 'android' ? <Smartphone size={16} /> : <Apple size={16} />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Rating</div>
            <div className="flex items-center gap-1.5 text-slate-200">
               <Star size={14} className="fill-warning-400 text-warning-400" />
               <span className="font-semibold text-sm">{app.rating.toFixed(1)}</span>
               <span className="text-xs text-slate-500">({(app.totalReviews / 1000).toFixed(1)}k)</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Sentiment</div>
            <div className="font-semibold text-sm text-success-400">{app.positivePercent}% Pos</div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
           <span className="text-slate-400">Churn Risk: <span className={app.churnRisk > 10 ? 'text-danger-400' : 'text-warning-400'}>{app.churnRisk}%</span></span>
           <span className={app.trend >= 0 ? 'text-success-400' : 'text-danger-400'}>{app.trend >= 0 ? '+' : ''}{app.trend}% Trend</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-2xl font-bold text-slate-50">Applications</h1>
        <p className="text-slate-400 mt-1">Manage and monitor all your products across platforms.</p>
      </header>

      <div>
        <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
           <Smartphone size={18} className="text-success-400" /> Android Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {androidApps.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4 border-b border-white/10 pb-2 mt-8">
           <Apple size={18} className="text-slate-300" /> iOS Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {iosApps.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      </div>
    </div>
  );
}

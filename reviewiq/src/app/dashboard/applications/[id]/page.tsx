'use client';

import React from 'react';
import { applications, reviews, themes } from '@/data/mockData';
import { notFound, useParams, useRouter } from 'next/navigation';
import KpiCard from '@/components/KpiCard';
import { Star, ArrowLeft, MessageSquare, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationDetail() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;
  const app = applications.find(a => a.id === appId);

  if (!app) {
    notFound();
  }

  const appReviews = reviews.filter(r => r.appId === appId);

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
         <ArrowLeft size={16} /> Back to Applications
      </button>

      <header className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="w-16 h-16 rounded-2xl bg-navy-800 flex items-center justify-center text-3xl border border-white/10 shadow-lg shrink-0">
          {app.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
             {app.name}
             <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${app.platform === 'android' ? 'bg-success-500/10 text-success-400' : 'bg-slate-700/50 text-slate-300'}`}>
               {app.platform}
             </span>
          </h1>
          <p className="text-slate-400 mt-1 flex items-center gap-3 text-sm">
             {app.category} • <span className="flex items-center gap-1"><Star size={14} className="fill-warning-400 text-warning-400"/> {app.rating.toFixed(1)}</span> • {app.totalReviews.toLocaleString()} Reviews
          </p>
        </div>
      </header>

      <h2 className="text-lg font-semibold text-slate-200 mt-8 mb-4">Customer Intelligence Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard title="Reviews" value={app.totalReviews.toLocaleString()} color="blue" />
        <KpiCard title="Positive" value={`${app.positivePercent}%`} color="green" />
        <KpiCard title="Neutral" value={`${app.neutralPercent}%`} color="cyan" />
        <KpiCard title="Negative" value={`${app.negativePercent}%`} color="red" />
        <KpiCard title="Avg Rating" value={app.rating.toFixed(1)} color="warning" />
        <KpiCard title="Churn Risk" value={`${app.churnRisk}%`} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="glass-card rounded-xl p-5">
           <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-white/5 pb-3">Top Issues for this App</h3>
           <div className="space-y-3">
             {themes.slice(0, 3).map((theme) => (
                <div key={theme.id} className="p-3 rounded-lg bg-navy-800/50 border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-navy-800 transition-colors">
                  <div>
                    <div className="font-medium text-slate-200 text-sm">{theme.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{theme.mentionCount} mentions • {theme.sentiment}% Negative</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 group-hover:text-electric-400" />
                </div>
             ))}
           </div>
           <Link href="/dashboard/reviews" className="block text-center text-xs text-electric-400 mt-4 hover:underline">View all themes</Link>
        </div>

        <div className="glass-card rounded-xl p-5">
           <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-white/5 pb-3">Recent Reviews</h3>
           <div className="space-y-3">
              {appReviews.slice(0, 3).map((review) => (
                 <div key={review.id} className="p-3 rounded-lg bg-navy-800/50 border border-white/5">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex gap-1">
                        {Array.from({length: 5}).map((_, i) => (
                           <Star key={i} size={10} className={i < review.rating ? 'fill-warning-400 text-warning-400' : 'text-slate-700'} />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500">{review.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1.5">{review.text}</p>
                 </div>
              ))}
           </div>
           <Link href="/dashboard/reviews" className="block text-center text-xs text-electric-400 mt-4 hover:underline">Explore all reviews</Link>
        </div>
      </div>
    </div>
  );
}

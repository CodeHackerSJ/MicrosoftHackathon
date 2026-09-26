'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { applications, reviews, themes } from '@/data/mockData';
import KpiCard from '@/components/KpiCard';
import { MessageSquare, ThumbsUp, ThumbsDown, Star, AlertTriangle, Heart, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function OverviewDashboard() {
  const { companyName, getFilteredApps } = useAppContext();
  const activeApps = getFilteredApps();

  // Aggregate mock data for the dashboard
  const totalReviews = activeApps.reduce((acc, app) => acc + app.totalReviews, 0);
  const avgPositive = activeApps.reduce((acc, app) => acc + app.positivePercent, 0) / (activeApps.length || 1);
  const avgNegative = activeApps.reduce((acc, app) => acc + app.negativePercent, 0) / (activeApps.length || 1);
  const avgNeutral = activeApps.reduce((acc, app) => acc + app.neutralPercent, 0) / (activeApps.length || 1);
  const avgRating = activeApps.reduce((acc, app) => acc + app.rating, 0) / (activeApps.length || 1);
  const avgChurn = activeApps.reduce((acc, app) => acc + app.churnRisk, 0) / (activeApps.length || 1);
  const avgSat = activeApps.reduce((acc, app) => acc + app.satisfaction, 0) / (activeApps.length || 1);

  // Mock trend data for area chart
  const trendData = Array.from({ length: 14 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    positive: Math.floor(avgPositive * 10) + Math.random() * 200,
    negative: Math.floor(avgNegative * 10) + Math.random() * 100,
  }));

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50">Good morning, {companyName}</h1>
        <p className="text-slate-400 mt-1">Here's what your customers are saying across your applications.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Reviews"
          value={totalReviews.toLocaleString()}
          trend={12.4}
          icon={<MessageSquare size={18} />}
          color="blue"
        />
        <KpiCard
          title="Positive Sentiment"
          value={`${avgPositive.toFixed(1)}%`}
          trend={2.1}
          icon={<ThumbsUp size={18} />}
          color="green"
        />
        <KpiCard
          title="Negative Sentiment"
          value={`${avgNegative.toFixed(1)}%`}
          trend={-3.2}
          icon={<ThumbsDown size={18} />}
          color="red"
        />
        <KpiCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          trend={0.2}
          icon={<Star size={18} />}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-100">Sentiment Trend</h3>
            <select className="bg-navy-800 border border-white/10 rounded-md text-xs px-2 py-1 text-slate-300">
              <option>Last 14 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1C2E', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="positive" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorPos)" />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorNeg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <KpiCard
            title="Potential Churn Risk"
            value={`${avgChurn.toFixed(1)}%`}
            trend={-1.4}
            subtitle="vs last period"
            icon={<AlertTriangle size={18} />}
            color="warning"
            delay={100}
          />
          <KpiCard
            title="Customer Satisfaction"
            value={`${avgSat.toFixed(0)}%`}
            trend={4.2}
            subtitle="vs last period"
            icon={<Heart size={18} />}
            color="purple"
            delay={200}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-100">Top Pain Points</h3>
            <button className="text-xs text-electric-400 hover:text-electric-300 flex items-center gap-1">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {themes.slice(0, 4).map((theme) => (
              <div key={theme.id} className="p-3 rounded-lg bg-navy-800/50 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-slate-200">{theme.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${theme.businessImpact === 'critical' ? 'bg-danger-500/20 text-danger-400' : 'bg-warning-500/20 text-warning-400'}`}>
                    {theme.businessImpact}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{theme.mentionCount.toLocaleString()} mentions</span>
                  <span>{theme.percentOfReviews}% of reviews</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Critical Reviews</h3>
          <div className="space-y-3">
             {reviews.filter(r => r.rating <= 2).slice(0, 3).map(review => (
                <div key={review.id} className="p-3 rounded-lg bg-navy-800/50 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      {Array.from({length: 5}).map((_, i) => (
                         <Star key={i} size={12} className={i < review.rating ? 'fill-warning-400 text-warning-400' : 'text-slate-600'} />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-2">{review.text}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

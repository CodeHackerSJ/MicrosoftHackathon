'use client';

import React from 'react';
import { sentimentTrends, ratingDistribution } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';
import MetricCard from '@/components/MetricCard';
import Badge from '@/components/Badge';
import {
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Star,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function SentimentAnalysisPage() {
  const { resolvedTheme } = useAppContext();
  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0';
  const axisColor = isDark ? '#64748B' : '#94A3B8';

  const pieData = [
    { name: 'Positive', value: 72, color: '#22C55E' },
    { name: 'Neutral', value: 16, color: '#0284C7' },
    { name: 'Negative', value: 12, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Sentiment Intelligence & Rating Breakdown
            </h1>
            <Badge variant="positive">Net Sentiment +60</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Statistical sentiment modeling, distribution curves, and rating telemetry across all store reviews.
          </p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Positive Sentiment"
          value="72.0%"
          trend={2.4}
          trendLabel="vs previous period"
          icon={<ThumbsUp size={16} />}
          color="green"
        />
        <MetricCard
          title="Neutral Sentiment"
          value="16.0%"
          trend={-0.6}
          trendLabel="passive customers"
          icon={<Meh size={16} />}
          color="cyan"
        />
        <MetricCard
          title="Negative Sentiment"
          value="12.0%"
          trend={-1.8}
          trendLabel="reduction in complaints"
          icon={<ThumbsDown size={16} />}
          color="red"
        />
        <MetricCard
          title="Net Sentiment Score"
          value="+60 NSS"
          trend={4.2}
          trendLabel="industry benchmark: +45"
          icon={<BarChart3 size={16} />}
          color="blue"
        />
      </div>

      {/* 2-Column Split: Donut Distribution & Rating Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Distribution Donut */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Overall Sentiment Ratio
              </h3>
              <Badge variant="outline">AI Confidence 94%</Badge>
            </div>

            <div className="h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#162238' : '#FFFFFF',
                      borderColor: isDark ? '#1E2C44' : '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  72%
                </span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                  Positive
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-around pt-3 border-t border-[var(--border-subtle)]">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[var(--text-secondary)] font-medium">
                  {d.name}: <strong>{d.value}%</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Distribution Bars */}
        <div className="saas-card p-5 lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Store Star Rating Distribution
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Volume breakdown across 1 to 5 star customer ratings.
                </p>
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                4.4 ★ Aggregate Average
              </span>
            </div>

            <div className="space-y-3.5 my-2">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <div className="w-12 text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1 shrink-0">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>{rating.stars} Star</span>
                  </div>

                  <div className="flex-1 h-2.5 bg-[var(--bg-card-subtle)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div
                      className={`h-full rounded-full transition-all ${
                        rating.stars >= 4
                          ? 'bg-emerald-500'
                          : rating.stars === 3
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${rating.percent}%` }}
                    />
                  </div>

                  <div className="w-14 text-right text-xs font-bold text-[var(--text-primary)] shrink-0">
                    {rating.percent}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>82% of all reviews are 4 stars or above</span>
            <span className="text-[var(--primary-600)] font-semibold">1-2 Star Reviews: 11%</span>
          </div>
        </div>
      </div>

      {/* 30-Day Sentiment Trend Chart */}
      <div className="saas-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)] mb-6">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              30-Day Longitudinal Sentiment Trend
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Stacked daily volume showing progression of customer sentiment.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span className="text-[var(--text-secondary)]">Positive</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-sky-500" />
              <span className="text-[var(--text-secondary)]">Neutral</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500" />
              <span className="text-[var(--text-secondary)]">Negative</span>
            </span>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="nuSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="neSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#162238' : '#FFFFFF',
                  borderColor: isDark ? '#1E2C44' : '#E2E8F0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#22C55E"
                strokeWidth={2}
                fill="url(#pSent)"
                name="Positive"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#0284C7"
                strokeWidth={2}
                fill="url(#nuSent)"
                name="Neutral"
              />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#neSent)"
                name="Negative"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

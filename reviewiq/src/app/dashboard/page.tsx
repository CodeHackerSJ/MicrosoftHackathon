'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { applications, reviews, themes, actionItems } from '@/data/mockData';
import MetricCard from '@/components/MetricCard';
import Badge from '@/components/Badge';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Download,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function OverviewDashboard() {
  const { companyName, getFilteredApps, resolvedTheme, dateRange } = useAppContext();
  const activeApps = getFilteredApps();
  const [chartView, setChartView] = useState<'sentiment' | 'volume'>('sentiment');

  // Aggregated calculations
  const totalReviews = activeApps.reduce((acc, app) => acc + app.totalReviews, 0);
  const avgPositive =
    activeApps.reduce((acc, app) => acc + app.positivePercent, 0) / (activeApps.length || 1);
  const avgNegative =
    activeApps.reduce((acc, app) => acc + app.negativePercent, 0) / (activeApps.length || 1);
  const avgNeutral =
    activeApps.reduce((acc, app) => acc + app.neutralPercent, 0) / (activeApps.length || 1);
  const avgRating =
    activeApps.reduce((acc, app) => acc + app.rating, 0) / (activeApps.length || 1);
  const avgChurn =
    activeApps.reduce((acc, app) => acc + app.churnRisk, 0) / (activeApps.length || 1);
  const avgSat =
    activeApps.reduce((acc, app) => acc + app.satisfaction, 0) / (activeApps.length || 1);

  // High quality mock trend data
  const days = dateRange === '7d' ? 7 : dateRange === '14d' ? 14 : 30;
  const trendData = Array.from({ length: days }).map((_, i) => {
    const dayNum = i + 1;
    const basePos = Math.round(avgPositive + Math.sin(i / 2) * 4);
    const baseNeg = Math.round(avgNegative + Math.cos(i / 2) * 3);
    const baseNeu = 100 - basePos - baseNeg;
    return {
      day: `Day ${dayNum}`,
      positive: Math.max(10, basePos),
      negative: Math.max(5, baseNeg),
      neutral: Math.max(5, baseNeu),
      volume: Math.round(250 + Math.sin(i) * 60 + Math.random() * 40),
    };
  });

  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0';
  const axisColor = isDark ? '#64748B' : '#94A3B8';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Executive Review Intelligence
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--primary-100)] font-semibold">
              Live Workspace
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Synthesized customer feedback telemetry across {activeApps.length} connected applications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] transition-colors shadow-sm"
          >
            <Download size={13} />
            <span>Export Report</span>
          </Link>
          <Link
            href="/dashboard/ai-analyzer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Sparkles size={13} />
            <span>AI Analyst</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Reviews Ingested"
          value={totalReviews.toLocaleString()}
          trend={12.4}
          trendLabel="vs last 30d"
          icon={<MessageSquare size={16} />}
          color="blue"
        />
        <MetricCard
          title="Positive Sentiment"
          value={`${avgPositive.toFixed(1)}%`}
          trend={2.4}
          trendLabel="favorable shift"
          icon={<ThumbsUp size={16} />}
          color="green"
        />
        <MetricCard
          title="Negative Sentiment"
          value={`${avgNegative.toFixed(1)}%`}
          trend={-1.8}
          trendLabel="reduction in complaints"
          icon={<ThumbsDown size={16} />}
          color="red"
        />
        <MetricCard
          title="Average App Store Rating"
          value={`${avgRating.toFixed(2)} ★`}
          trend={0.15}
          trendLabel="across Android & iOS"
          icon={<Star size={16} />}
          color="warning"
        />
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="saas-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)] flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Predicted Churn Exposure
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {avgChurn.toFixed(1)}%
              </p>
            </div>
          </div>
          <Badge variant="medium">-0.8% drift</Badge>
        </div>

        <div className="saas-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)] flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Customer Satisfaction (CSAT)
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {avgSat.toFixed(0)} / 100
              </p>
            </div>
          </div>
          <Badge variant="positive">Top Quartile</Badge>
        </div>

        <div className="saas-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--primary-100)] flex items-center justify-center">
              <Layers size={16} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Tracked Theme Clusters
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {themes.length} Active Themes
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/reviews"
            className="text-xs text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-0.5"
          >
            Explore <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* 3. Main Trend Chart */}
      <div className="saas-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[var(--border-subtle)]">
          <div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              Customer Sentiment & Feedback Trajectory
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Daily distribution of positive vs. negative review sentiment over the selected window.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex p-0.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card-subtle)] text-xs">
              <button
                onClick={() => setChartView('sentiment')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  chartView === 'sentiment'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Sentiment %
              </button>
              <button
                onClick={() => setChartView('volume')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  chartView === 'volume'
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Review Volume
              </button>
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="chartPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="chartNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="chartVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="day" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#162238' : '#FFFFFF',
                  borderColor: isDark ? '#1E2C44' : '#E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  color: isDark ? '#F8FAFC' : '#0F172A',
                }}
              />
              {chartView === 'sentiment' ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="positive"
                    name="Positive %"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#chartPos)"
                  />
                  <Area
                    type="monotone"
                    dataKey="negative"
                    name="Negative %"
                    stroke="#EF4444"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#chartNeg)"
                  />
                </>
              ) : (
                <Area
                  type="monotone"
                  dataKey="volume"
                  name="Daily Reviews"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#chartVol)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Two-Column Split: Top Themes & Recent Critical Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Top Themes & Pain Points */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Top Pain Points & Clusters
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Recurring issues ranked by customer mention velocity and severity.
                </p>
              </div>
              <Link
                href="/dashboard/reviews"
                className="text-xs text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-1"
              >
                View all <ArrowRight size={11} />
              </Link>
            </div>

            <div className="space-y-3">
              {themes.slice(0, 4).map((theme) => (
                <div
                  key={theme.id}
                  className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] hover:border-[var(--border-app)] transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      {theme.name}
                    </span>
                    <Badge
                      variant={
                        theme.businessImpact === 'critical'
                          ? 'critical'
                          : theme.businessImpact === 'high'
                          ? 'high'
                          : 'medium'
                      }
                    >
                      {theme.businessImpact} Impact
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mb-2">
                    {theme.aiSummary}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span>{theme.mentionCount.toLocaleString()} mentions</span>
                    <span>{theme.percentOfReviews}% of total volume</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
            <Link
              href="/dashboard/ai-analyzer"
              className="text-xs text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-1 justify-center"
            >
              Analyze Root Causes with AI Copilot <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right: Recent Critical Reviews */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Critical Reviews Requiring Attention
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  1-2 star reviews with high churn risk flags.
                </p>
              </div>
              <Link
                href="/dashboard/reviews"
                className="text-xs text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-1"
              >
                All reviews <ArrowRight size={11} />
              </Link>
            </div>

            <div className="space-y-3">
              {reviews
                .filter((r) => r.rating <= 2)
                .slice(0, 3)
                .map((review) => {
                  const app = applications.find((a) => a.id === review.appId);
                  return (
                    <div
                      key={review.id}
                      className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                className={
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-[var(--border-app)]'
                                }
                              />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-[var(--text-primary)]">
                            {review.userName}
                          </span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-2">
                        "{review.text}"
                      </p>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[var(--text-muted)]">
                          {app?.name} ({review.platform}) · v{review.version}
                        </span>
                        <Badge variant="high">High Churn Risk</Badge>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
            <Link
              href="/dashboard/actions"
              className="text-xs text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-1 justify-center"
            >
              Open Action Center to Assign Tasks <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Recommended Actions Section */}
      <div className="saas-card p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              AI-Synthesized Recommended Actions
            </h3>
            <p className="text-[11px] text-[var(--text-muted)]">
              High-impact operational tasks prioritized by customer churn correlation.
            </p>
          </div>
          <Link
            href="/dashboard/actions"
            className="text-xs text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-1"
          >
            Manage all ({actionItems.length}) <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {actionItems.slice(0, 3).map((action) => (
            <div
              key={action.id}
              className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] flex flex-col justify-between hover:border-[var(--border-app)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <Badge variant={action.priority === 'critical' ? 'critical' : 'high'}>
                    {action.priority} Priority
                  </Badge>
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">
                    {action.team}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">
                  {action.title}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-muted)]">
                  {action.mentions.toLocaleString()} mentions
                </span>
                <Link
                  href="/dashboard/actions"
                  className="text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-0.5"
                >
                  Action <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { applications, reviews, themes } from '@/data/mockData';
import { notFound, useParams, useRouter } from 'next/navigation';
import MetricCard from '@/components/MetricCard';
import Badge from '@/components/Badge';
import {
  Star,
  ArrowLeft,
  Smartphone,
  Apple,
  MessageSquare,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ApplicationDetail() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;
  const app = applications.find((a) => a.id === appId);

  if (!app) {
    notFound();
  }

  const appReviews = reviews.filter((r) => r.appId === appId);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Applications</span>
      </button>

      {/* App Header Card */}
      <div className="saas-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-3xl shadow-sm shrink-0">
            {app.icon}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                {app.name}
              </h1>
              <Badge variant={app.platform === 'android' ? 'positive' : 'secondary'}>
                <span className="flex items-center gap-1">
                  {app.platform === 'android' ? <Smartphone size={10} /> : <Apple size={10} />}
                  <span>{app.platform}</span>
                </span>
              </Badge>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-2 flex-wrap">
              <span>{app.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[var(--text-primary)] font-semibold">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                {app.rating.toFixed(1)} Rating
              </span>
              <span>•</span>
              <span>{app.totalReviews.toLocaleString()} Ingested Reviews</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/ai-analyzer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Sparkles size={13} />
            <span>Analyze with AI</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard title="Total Reviews" value={app.totalReviews.toLocaleString()} color="blue" />
        <MetricCard title="Positive" value={`${app.positivePercent}%`} color="green" />
        <MetricCard title="Neutral" value={`${app.neutralPercent}%`} color="cyan" />
        <MetricCard title="Negative" value={`${app.negativePercent}%`} color="red" />
        <MetricCard title="Avg Rating" value={`${app.rating.toFixed(1)} ★`} color="warning" />
        <MetricCard title="Churn Risk" value={`${app.churnRisk}%`} color="warning" />
      </div>

      {/* Two-Column Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Issues */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Top Recurring Issues for {app.name}
            </h3>
            <Link
              href="/dashboard/reviews"
              className="text-xs text-[var(--primary-600)] font-semibold hover:underline"
            >
              All Themes
            </Link>
          </div>

          <div className="space-y-3">
            {themes.slice(0, 3).map((theme) => (
              <div
                key={theme.id}
                className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {theme.name}
                    </span>
                    <Badge variant={theme.businessImpact === 'critical' ? 'critical' : 'medium'}>
                      {theme.businessImpact}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {theme.mentionCount} mentions · {theme.sentiment}% Negative sentiment
                  </p>
                </div>
                <ChevronRight size={15} className="text-[var(--text-muted)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Recent Store Feedback ({app.platform})
            </h3>
            <Link
              href="/dashboard/reviews"
              className="text-xs text-[var(--primary-600)] font-semibold hover:underline"
            >
              Explorer
            </Link>
          </div>

          <div className="space-y-3">
            {appReviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]"
              >
                <div className="flex items-center justify-between mb-1">
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
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mt-1">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

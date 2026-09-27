'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { applications } from '@/data/mockData';
import MetricCard from '@/components/MetricCard';
import Badge from '@/components/Badge';
import {
  Star,
  Smartphone,
  Apple,
  AppWindow,
  TrendingUp,
  TrendingDown,
  Layers,
  ArrowRight,
  Plus,
  Search,
} from 'lucide-react';

export default function ApplicationsPage() {
  const [platformFilter, setPlatformFilter] = useState<'all' | 'android' | 'ios'>('all');
  const [search, setSearch] = useState('');

  const filtered = applications.filter((app) => {
    const matchPlatform = platformFilter === 'all' || app.platform === platformFilter;
    const matchSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.category.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchSearch;
  });

  const totalReviews = applications.reduce((a, b) => a + b.totalReviews, 0);
  const avgRating = applications.reduce((a, b) => a + b.rating, 0) / applications.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Applications & Stores
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Manage connected Google Play and Apple App Store product endpoints.
          </p>
        </div>

        <button
          onClick={() => alert('Connect New App modal: Google Play Store & Apple App Store integrations ready.')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Connect Application</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Integrations"
          value={`${applications.length} Apps`}
          trend={0}
          trendLabel="3 Android · 2 iOS"
          icon={<AppWindow size={16} />}
          color="blue"
        />
        <MetricCard
          title="Total Store Reviews"
          value={totalReviews.toLocaleString()}
          trend={12.4}
          trendLabel="vs last month"
          icon={<Layers size={16} />}
          color="cyan"
        />
        <MetricCard
          title="Portfolio Avg Rating"
          value={`${avgRating.toFixed(2)} ★`}
          trend={0.15}
          trendLabel="across all stores"
          icon={<Star size={16} />}
          color="warning"
        />
        <MetricCard
          title="Sync Health Status"
          value="100% Operational"
          trendLabel="All webhooks healthy"
          icon={<Smartphone size={16} />}
          color="green"
        />
      </div>

      {/* Filters & Search */}
      <div className="saas-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by app name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs saas-input placeholder:text-[var(--text-tertiary)]"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['all', 'android', 'ios'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platformFilter === p
                  ? 'bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--primary-100)] font-semibold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-app)]'
              }`}
            >
              <span className="capitalize">{p === 'all' ? 'All Platforms' : p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((app) => (
          <Link key={app.id} href={`/dashboard/applications/${app.id}`} className="block group">
            <div className="saas-card p-5 h-full flex flex-col justify-between hover:border-[var(--primary-500)] hover:shadow-md transition-all">
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-2xl shadow-sm">
                      {app.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary-600)] transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)]">{app.category}</p>
                    </div>
                  </div>
                  <Badge variant={app.platform === 'android' ? 'positive' : 'secondary'}>
                    <span className="flex items-center gap-1">
                      {app.platform === 'android' ? <Smartphone size={11} /> : <Apple size={11} />}
                      <span>{app.platform}</span>
                    </span>
                  </Badge>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] mb-4">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                      Store Rating
                    </span>
                    <div className="flex items-center gap-1 text-[var(--text-primary)] font-bold text-sm mt-0.5">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>{app.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-[var(--text-muted)] font-normal">
                        ({(app.totalReviews / 1000).toFixed(1)}k)
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                      Sentiment
                    </span>
                    <div className="text-sm font-bold text-[var(--success-text)] mt-0.5">
                      {app.positivePercent}% Pos
                    </div>
                  </div>
                </div>

                {/* Sentiment Visual Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mb-1">
                    <span>Sentiment Distribution</span>
                    <span>{app.negativePercent}% Neg</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border-app)] flex overflow-hidden">
                    <div style={{ width: `${app.positivePercent}%` }} className="bg-emerald-500" />
                    <div style={{ width: `${app.neutralPercent}%` }} className="bg-sky-400" />
                    <div style={{ width: `${app.negativePercent}%` }} className="bg-rose-500" />
                  </div>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] text-[11px]">
                  Churn Risk:{' '}
                  <strong className={app.churnRisk > 10 ? 'text-[var(--danger-text)]' : 'text-[var(--warning-text)]'}>
                    {app.churnRisk}%
                  </strong>
                </span>
                <span className="text-[var(--primary-600)] font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform">
                  View Telemetry <ArrowRight size={11} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { TrendingUp, Activity, BarChart, AlertTriangle, ArrowRight, Layers } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import Badge from '@/components/Badge';
import MetricCard from '@/components/MetricCard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function TrendsAndDriftPage() {
  const { resolvedTheme } = useAppContext();
  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0';
  const axisColor = isDark ? '#64748B' : '#94A3B8';

  const driftData = Array.from({ length: 12 }).map((_, i) => ({
    period: `Wk ${i + 1}`,
    paymentComplaints: Math.round(20 + Math.sin(i / 2) * 5 + (i > 7 ? 28 : 0)),
    crashReports: Math.round(15 + Math.cos(i / 2) * 4 + (i > 7 ? 14 : 0)),
    onboardingPraise: Math.round(45 + Math.sin(i / 3) * 6),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Trend, Volume & Semantic Drift Telemetry
            </h1>
            <Badge variant="medium">1 Drift Anomaly Active</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Detect sudden shifts in customer complaints, version regressions, and theme volume drift over time.
          </p>
        </div>
      </div>

      {/* Drift Detection Alert Banner */}
      <div className="saas-card p-5 border-l-4 border-l-[var(--warning-solid)] bg-[var(--bg-card)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)] shrink-0">
              <Activity size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  Statistically Significant Negative Drift Detected
                </h3>
                <Badge variant="critical">v4.2 Correlated</Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                <strong>Payment complaints increased +24%</strong> starting at Week 9 immediately following the Android v4.2 release. Transaction failure complaints are concentrated on UPI checkout endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Drift Chart */}
      <div className="saas-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)] mb-6">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Theme Volume Trajectory (12-Week Longitudinal View)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Tracking normalized weekly mention counts for top positive and negative themes.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500" />
              <span className="text-[var(--text-secondary)]">Payment Complaints</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500" />
              <span className="text-[var(--text-secondary)]">Crash Reports</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span className="text-[var(--text-secondary)]">Onboarding Praise</span>
            </span>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={driftData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="period" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#162238' : '#FFFFFF',
                  borderColor: isDark ? '#1E2C44' : '#E2E8F0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="paymentComplaints"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Payment Complaints"
              />
              <Line
                type="monotone"
                dataKey="crashReports"
                stroke="#EF4444"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Crash Reports"
              />
              <Line
                type="monotone"
                dataKey="onboardingPraise"
                stroke="#22C55E"
                strokeWidth={2.5}
                dot={{ r: 3 }}
                name="Onboarding Praise"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

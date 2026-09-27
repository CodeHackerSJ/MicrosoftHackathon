'use client';

import React from 'react';
import { churnFactors, churnTrend } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';
import MetricCard from '@/components/MetricCard';
import Badge from '@/components/Badge';
import {
  Users,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  UserX,
  UserCheck,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from 'recharts';

export default function ChurnIntelligencePage() {
  const { resolvedTheme } = useAppContext();
  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#E2E8F0';
  const axisColor = isDark ? '#64748B' : '#94A3B8';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Customer Churn & Retention Intelligence
            </h1>
            <Badge variant="medium">8.6% Total Churn Risk</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Predictive customer churn modeling based on review sentiment decay, recurring transaction failures, and bug frequency.
          </p>
        </div>
      </div>

      {/* Churn Cohort Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Churn Risk"
          value="8.6%"
          trend={1.2}
          trendLabel="slight upward drift"
          icon={<AlertTriangle size={16} />}
          color="warning"
        />

        <div className="saas-card p-5 border-t-4 border-t-[var(--danger-solid)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                High Risk Cohort
              </span>
              <UserX size={15} className="text-[var(--danger-solid)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--danger-text)]">
              1,243 Users
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Active checkout failures or critical crashes
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--danger-text)] font-semibold">
            Action: Immediate patch required
          </div>
        </div>

        <div className="saas-card p-5 border-t-4 border-t-[var(--warning-solid)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Medium Risk Cohort
              </span>
              <AlertTriangle size={15} className="text-[var(--warning-solid)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--warning-text)]">
              2,891 Users
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Performance lag and repeated negative feedback
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--warning-text)] font-semibold">
            Action: Proactive outreach / CS follow-up
          </div>
        </div>

        <div className="saas-card p-5 border-t-4 border-t-[var(--success-solid)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Low Risk / Satisfied
              </span>
              <UserCheck size={15} className="text-[var(--success-solid)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--success-text)]">
              8,321 Users
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Stable sentiment and 4-5 star satisfaction
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--success-text)] font-semibold">
            Action: Eligible for referral prompts
          </div>
        </div>
      </div>

      {/* Two Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Drivers Bar Chart */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Top Churn Drivers (Impact Severity Index)
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Root-cause themes ranked by statistical churn correlation.
                </p>
              </div>
              <Badge variant="critical">Critical</Badge>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={churnFactors}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                  <XAxis type="number" stroke={axisColor} fontSize={10} domain={[0, 100]} />
                  <YAxis
                    dataKey="factor"
                    type="category"
                    stroke={axisColor}
                    fontSize={11}
                    width={130}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#162238' : '#FFFFFF',
                      borderColor: isDark ? '#1E2C44' : '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar
                    dataKey="impact"
                    fill="#EF4444"
                    name="Churn Impact Score"
                    radius={[0, 4, 4, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Payment failures account for 42% of all critical churn signals</span>
          </div>
        </div>

        {/* 12-Week Churn vs Satisfaction Line Chart */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  12-Week Longitudinal Retention Telemetry
                </h3>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Correlation of predicted churn risk % vs customer satisfaction score.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-[var(--warning-text)]">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Churn Risk</span>
                </span>
                <span className="flex items-center gap-1 text-[var(--success-text)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Satisfaction</span>
                </span>
              </div>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={churnTrend} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="week" stroke={axisColor} fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis
                    yAxisId="left"
                    stroke={axisColor}
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 15]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke={axisColor}
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[60, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#162238' : '#FFFFFF',
                      borderColor: isDark ? '#1E2C44' : '#E2E8F0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="churnRisk"
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#F59E0B', strokeWidth: 0 }}
                    name="Churn Risk %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#22C55E"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#22C55E', strokeWidth: 0 }}
                    name="Satisfaction Index"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <span>Negative correlation coefficient: <strong>r = -0.84</strong> (High statistical significance)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

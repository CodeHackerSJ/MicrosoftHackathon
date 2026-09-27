'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'cyan' | 'green' | 'red' | 'warning' | 'purple';
  delay?: number;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel = 'vs previous period',
  icon,
  color = 'blue',
  delay = 0,
  className = '',
}: MetricCardProps) {
  const isPositiveTrend = trend !== undefined && trend > 0;
  const isNegativeTrend = trend !== undefined && trend < 0;
  const isNeutralTrend = trend !== undefined && trend === 0;

  const iconBgMap = {
    blue: 'bg-[var(--primary-50)] text-[var(--primary-500)] border-[var(--primary-100)]',
    cyan: 'bg-[var(--cyan-bg)] text-[var(--cyan-text)] border-[var(--cyan-border)]',
    green: 'bg-[var(--success-bg)] text-[var(--success-text)] border-[var(--success-border)]',
    red: 'bg-[var(--danger-bg)] text-[var(--danger-text)] border-[var(--danger-border)]',
    warning: 'bg-[var(--warning-bg)] text-[var(--warning-text)] border-[var(--warning-border)]',
    purple: 'bg-[var(--purple-bg)] text-[var(--purple-text)] border-[var(--purple-border)]',
  };

  return (
    <div
      className={`saas-card p-5 relative overflow-hidden animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">
          {title}
        </span>
        {icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border text-sm shrink-0 ${iconBgMap[color]}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        {trend !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${
              isPositiveTrend
                ? 'bg-[var(--success-bg)] text-[var(--success-text)]'
                : isNegativeTrend
                ? 'bg-[var(--danger-bg)] text-[var(--danger-text)]'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)]'
            }`}
          >
            {isPositiveTrend && <TrendingUp size={11} />}
            {isNegativeTrend && <TrendingDown size={11} />}
            {isNeutralTrend && <Minus size={11} />}
            {isPositiveTrend ? '+' : ''}
            {trend}%
          </span>
        )}
        {(subtitle || trendLabel) && (
          <span className="text-[var(--text-muted)] truncate">
            {subtitle || trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}

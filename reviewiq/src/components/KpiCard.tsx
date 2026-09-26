'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'cyan' | 'green' | 'red' | 'warning' | 'purple';
  delay?: number;
}

const colorMap = {
  blue: 'from-electric-500/20 to-electric-600/5',
  cyan: 'from-cyan-500/20 to-cyan-500/5',
  green: 'from-success-500/20 to-success-500/5',
  red: 'from-danger-500/20 to-danger-500/5',
  warning: 'from-warning-500/20 to-warning-500/5',
  purple: 'from-purple-500/20 to-purple-500/5',
};

const iconColorMap = {
  blue: 'text-electric-400',
  cyan: 'text-cyan-400',
  green: 'text-success-400',
  red: 'text-danger-400',
  warning: 'text-warning-400',
  purple: 'text-purple-400',
};

export default function KpiCard({ title, value, subtitle, trend, icon, color = 'blue', delay = 0 }: KpiCardProps) {
  return (
    <div
      className="glass-card-hover rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {icon && (
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
            <span className={iconColorMap[color]}>{icon}</span>
          </div>
        )}
      </div>
      <div className="animate-count">
        <div className="text-2xl font-bold text-slate-50 tracking-tight">{value}</div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {trend !== undefined && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              trend >= 0 ? 'text-success-400' : 'text-danger-400'
            }`}
          >
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend >= 0 ? '+' : ''}
            {trend}%
          </span>
        )}
        {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
      </div>
    </div>
  );
}

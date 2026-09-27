'use client';

import React from 'react';

export type BadgeVariant =
  | 'positive'
  | 'neutral'
  | 'negative'
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'ai'
  | 'primary'
  | 'secondary'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = 'secondary',
  size = 'sm',
  icon,
  className = '',
}: BadgeProps) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }[size];

  const variantStyles: Record<BadgeVariant, string> = {
    positive: 'bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]',
    neutral: 'bg-[var(--cyan-bg)] text-[var(--cyan-text)] border border-[var(--cyan-border)]',
    negative: 'bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)]',
    critical: 'bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)] font-semibold',
    high: 'bg-[var(--danger-bg)] text-[var(--danger-text)] border border-[var(--danger-border)]',
    medium: 'bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)]',
    low: 'bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]',
    ai: 'bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)]',
    primary: 'bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--primary-100)]',
    secondary: 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] border border-[var(--border-app)]',
    outline: 'bg-transparent text-[var(--text-muted)] border border-[var(--border-app)]',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md uppercase tracking-wider ${sizeStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

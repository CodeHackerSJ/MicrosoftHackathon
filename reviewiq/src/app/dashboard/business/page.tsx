'use client';

import React from 'react';
import { businessInsights } from '@/data/mockData';
import Badge from '@/components/Badge';
import {
  Briefcase,
  TrendingUp,
  AlertOctagon,
  ThumbsUp,
  Zap,
  Radio,
  ArrowRight,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function BusinessInsightsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Strategic Business Insights
            </h1>
            <Badge variant="primary">Decision Support Matrix</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Synthesized product intelligence derived from recurring customer feedback, feature requests, and revenue friction.
          </p>
        </div>
      </div>

      {/* Executive Decision Summary Box */}
      <div className="saas-card p-5 border-l-4 border-l-[var(--primary-500)] bg-[var(--bg-card)]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[var(--primary-600)]" />
            <span className="text-xs font-bold text-[var(--primary-600)] uppercase tracking-wider">
              Executive Takeaway & Decision Matrix
            </span>
          </div>
          <Badge variant="critical">Action Required</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs">
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              1. Key Observation
            </span>
            <p className="text-[var(--text-secondary)] font-medium mt-1 leading-relaxed">
              Payment failures on Android v4.2 are the top driver of user dissatisfaction.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              2. Evidence Base
            </span>
            <p className="text-[var(--text-secondary)] font-medium mt-1 leading-relaxed">
              2,341 mentions in last 14 days; UPI checkout failure frequency up +24%.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              3. Business Impact
            </span>
            <p className="text-[var(--danger-text)] font-semibold mt-1 leading-relaxed">
              Estimated 8.6% monthly churn exposure in high-intent buyer cohort.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              4. Recommended Action
            </span>
            <p className="text-[var(--success-text)] font-semibold mt-1 leading-relaxed">
              Deploy v4.2.1 hotfix with fallback UPI gateway and retry mechanisms.
            </p>
          </div>
        </div>
      </div>

      {/* 2x2 Structured Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Pain Points */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <AlertOctagon size={16} className="text-[var(--danger-solid)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Critical Pain Points
                </h3>
              </div>
              <Badge variant="critical">Engineering Priority</Badge>
            </div>

            <div className="space-y-3">
              {businessInsights.painPoints.map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {item.title}
                    </span>
                    <Badge
                      variant={
                        item.severity === 'critical'
                          ? 'critical'
                          : item.severity === 'high'
                          ? 'high'
                          : 'medium'
                      }
                    >
                      {item.severity}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[var(--border-subtle)]">
                    <span className="text-[var(--danger-text)] font-semibold">
                      ↑ {item.trend}% complaint velocity
                    </span>
                    <Link
                      href="/dashboard/actions"
                      className="text-[var(--primary-600)] font-semibold hover:underline flex items-center gap-0.5"
                    >
                      Create Jira Task <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Requests Matrix */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[var(--primary-500)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  High-Demand Feature Requests
                </h3>
              </div>
              <Badge variant="primary">Product Roadmap</Badge>
            </div>

            <div className="space-y-3">
              {businessInsights.featureRequests.map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {item.feature}
                    </span>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      Strong user intent · High satisfaction potential
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      {item.demand} <span className="text-[10px] text-[var(--text-muted)] font-normal">mentions</span>
                    </div>
                    <div className="text-[11px] text-[var(--success-text)] font-semibold">
                      ↑ {item.growth}% request growth
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            Dark Mode request demand grew <strong>+31%</strong> over the past quarter.
          </div>
        </div>

        {/* Product Strengths */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
            <div className="flex items-center gap-2">
              <ThumbsUp size={16} className="text-[var(--success-solid)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Core Product Strengths & Differentiators
              </h3>
            </div>
            <Badge variant="positive">Retention Drivers</Badge>
          </div>

          <div className="space-y-3">
            {businessInsights.strengths.map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Consistently highlighted by power users
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-[var(--success-text)]">
                    {item.score}% CSAT
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    {item.mentions.toLocaleString()} mentions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emerging Issues & Early Signals */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-[var(--warning-solid)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Emerging Signals & Anomaly Detection
              </h3>
            </div>
            <Badge variant="medium">Early Warning</Badge>
          </div>

          <div className="space-y-3">
            {businessInsights.emergingIssues.map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]"
              >
                <div className="text-xs font-bold text-[var(--text-primary)] mb-1">
                  {item.issue}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span>Detected: {item.firstDetected}</span>
                  <span className="text-[var(--warning-text)] font-semibold">
                    {item.velocity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

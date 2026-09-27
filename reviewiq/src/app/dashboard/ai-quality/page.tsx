'use client';

import React from 'react';
import { Shield, CheckCircle2, ShieldCheck, FileKey, Server, RefreshCw, AlertCircle } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import Badge from '@/components/Badge';

export default function AIQualityPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              AI Quality, Validation & Privacy Governance
            </h1>
            <Badge variant="positive">Model Health: Optimal</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Production NLP model metrics, PII redaction compliance, and continuous ground-truth evaluation telemetry.
          </p>
        </div>

        <button
          onClick={() => alert('Model validation benchmark re-evaluated: Accuracy confirmed at 91.4%.')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] transition-colors shadow-sm"
        >
          <RefreshCw size={13} />
          <span>Run Benchmark Test</span>
        </button>
      </div>

      {/* Model Benchmark KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Model Accuracy"
          value="91.4%"
          trend={0.6}
          trendLabel="vs v4.4 baseline"
          icon={<Shield size={16} />}
          color="blue"
        />
        <MetricCard
          title="Precision Score"
          value="90.2%"
          trend={0.4}
          trendLabel="sentiment classification"
          icon={<CheckCircle2 size={16} />}
          color="cyan"
        />
        <MetricCard
          title="Recall Rate"
          value="89.8%"
          trend={0.8}
          trendLabel="theme detection coverage"
          icon={<Server size={16} />}
          color="purple"
        />
        <MetricCard
          title="Harmonic F1 Score"
          value="90.0%"
          trend={0.5}
          trendLabel="zero semantic drift"
          icon={<ShieldCheck size={16} />}
          color="green"
        />
      </div>

      {/* Two-Column Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Privacy & PII */}
        <div className="saas-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--success-solid)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Enterprise Data Privacy & PII Protection
              </h3>
            </div>
            <Badge variant="positive">SOC 2 Compliant</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]">
              <div className="flex items-center gap-3">
                <FileKey size={16} className="text-[var(--primary-500)]" />
                <div>
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    Automatic PII Masking & Anonymization
                  </span>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Strips names, card numbers, emails, and phone numbers before analysis
                  </p>
                </div>
              </div>
              <Badge variant="positive">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]">
              <div className="flex items-center gap-3">
                <Server size={16} className="text-[var(--primary-500)]" />
                <div>
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    Raw Data Retention Period
                  </span>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Encrypted storage with automatic zero-trust purging
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[var(--text-primary)] font-mono">
                90 Days
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
              <div className="text-2xl font-bold text-[var(--warning-text)]">
                243
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                Sensitive entities automatically redacted from store reviews this month (PII, tokens, contact info).
              </p>
            </div>
          </div>
        </div>

        {/* Model Validation Benchmark */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Continuous Benchmark Dataset
              </h3>
              <Badge variant="outline">2,000 Sample Batch</Badge>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              ReviewIQ models undergo automated regression testing against a curated ground-truth dataset of <strong>2,000 verified human-labeled reviews</strong>. Any model drift or hallucination exceeding 1.5% triggers automatic rollback to baseline.
            </p>

            <div className="p-4 rounded-xl border border-[var(--success-border)] bg-[var(--success-bg)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={20} className="text-[var(--success-solid)]" />
                <div>
                  <span className="text-xs font-bold text-[var(--success-text)] block">
                    All Evaluation Benchmarks Passed
                  </span>
                  <span className="text-[11px] text-[var(--success-text)] opacity-90">
                    Latest validation run: Today, 08:00 AM UTC
                  </span>
                </div>
              </div>
              <Badge variant="positive">Zero Drift</Badge>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Model Version: ReviewIQ Core v4.5.2</span>
            <span>Latency: 142ms avg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

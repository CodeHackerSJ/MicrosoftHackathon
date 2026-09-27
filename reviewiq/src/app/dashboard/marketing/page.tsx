'use client';

import React from 'react';
import { marketingIntelligence } from '@/data/mockData';
import Badge from '@/components/Badge';
import {
  Megaphone,
  Target,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Sparkles,
  Users,
  Copy,
  Check,
} from 'lucide-react';

export default function MarketingIntelligencePage() {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  const copyMessage = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Marketing Intelligence & Voice of Customer
            </h1>
            <Badge variant="primary">Campaign Optimization</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Mine natural customer vocabulary, high-conversion ad copy angles, and audience segment motivations.
          </p>
        </div>
      </div>

      {/* Two-Column Top: VoC & Campaign Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice of Customer Keywords & Quotes */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-[var(--cyan-solid)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Voice of Customer Vocabulary
                </h3>
              </div>
              <span className="text-[11px] text-[var(--text-muted)]">High Positive Resonance</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-3">
              Most frequent high-sentiment keywords used by 5-star reviewers:
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {marketingIntelligence.keywords.slice(0, 10).map((kw, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] hover:border-[var(--primary-500)] rounded-lg flex items-center gap-2 text-xs transition-colors"
                >
                  <span className="font-semibold text-[var(--text-primary)]">{kw.word}</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {kw.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              High-Impact Organic Customer Quotes
            </h4>
            <div className="space-y-2.5">
              {marketingIntelligence.strengths.slice(0, 3).map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] border-l-4 border-l-[var(--cyan-solid)] text-xs"
                >
                  <div className="font-bold text-[var(--text-primary)] mb-0.5">
                    {item.keyword}
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] italic leading-relaxed">
                    "{item.quote}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Opportunities */}
        <div className="saas-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-[var(--warning-solid)]" />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Data-Driven Campaign Angles
                </h3>
              </div>
              <Badge variant="ai">AI Synthesized</Badge>
            </div>

            <div className="space-y-3.5">
              {marketingIntelligence.campaigns.map((camp, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] relative group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[var(--primary-600)] uppercase tracking-wider">
                      {camp.title}
                    </span>
                    <button
                      onClick={() => copyMessage(i, camp.message)}
                      className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1"
                      title="Copy copy text"
                    >
                      {copiedId === i ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedId === i ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="text-sm font-bold text-[var(--text-primary)] my-1.5 leading-snug">
                    "{camp.message}"
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] mb-2.5 leading-relaxed">
                    <strong>Evidence Basis:</strong> {camp.basis}
                  </p>

                  <div className="text-[10px] text-[var(--text-muted)] font-medium bg-[var(--bg-card)] px-2.5 py-1 rounded border border-[var(--border-subtle)] inline-block">
                    Target Segment: <strong className="text-[var(--text-primary)]">{camp.audience}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience Signals Section */}
      <div className="saas-card p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-4">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-[var(--primary-500)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Audience Segment Telemetry & Friction Points
            </h3>
          </div>
          <span className="text-xs text-[var(--text-muted)]">Across 100% of review cohort</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketingIntelligence.audienceSegments.map((seg, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-center flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-[var(--primary-600)] mb-1">
                  {seg.percentage}%
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] mb-2">
                  {seg.segment}
                </div>
              </div>

              <div className="mt-2 text-[11px] text-[var(--text-secondary)] bg-[var(--bg-card)] p-2 rounded-lg border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] block text-[10px] uppercase font-semibold mb-0.5">
                  Top Friction Concern:
                </span>
                <span className="font-semibold text-[var(--danger-text)]">
                  {seg.topConcern}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

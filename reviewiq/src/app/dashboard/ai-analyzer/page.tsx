'use client';

import React, { useState } from 'react';
import { aiAnalyzerResponses } from '@/data/mockData';
import Badge from '@/components/Badge';
import {
  Brain,
  Sparkles,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Search,
  ArrowRight,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Layers,
  Zap,
} from 'lucide-react';

export default function AIAnalyzerPage() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState<typeof aiAnalyzerResponses['default'] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim()) return;
    setQuery(q);
    setIsAnalyzing(true);
    setResponse(null);

    setTimeout(() => {
      const lower = q.toLowerCase();
      let res = aiAnalyzerResponses.default;
      if (lower.includes('complain') || lower.includes('problem') || lower.includes('issue'))
        res = aiAnalyzerResponses.complaints;
      else if (lower.includes('sentiment') || lower.includes('drop') || lower.includes('month'))
        res = aiAnalyzerResponses.sentiment;
      else if (lower.includes('feature') || lower.includes('want') || lower.includes('request'))
        res = aiAnalyzerResponses.features;
      else if (lower.includes('churn') || lower.includes('risk') || lower.includes('retention'))
        res = aiAnalyzerResponses.churn;
      else if (lower.includes('priorit') || lower.includes('fix') || lower.includes('roadmap'))
        res = aiAnalyzerResponses.priority;

      setResponse(res);
      setIsAnalyzing(false);
    }, 1100);
  };

  const copyAnalysis = () => {
    if (!response) return;
    const text = `${response.answer}\n\nEvidence:\n${response.evidence.join('\n')}\n\nRecommendations:\n${response.recommendations.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleCategories = [
    {
      category: 'Product Health & Defects',
      queries: [
        'What are customers complaining about the most?',
        'What should the product team prioritize to fix first?',
      ],
    },
    {
      category: 'Retention & Churn Signals',
      queries: [
        'Which complaints could increase churn?',
        'Why did sentiment drop this month?',
      ],
    },
    {
      category: 'Roadmap & Opportunities',
      queries: [
        'What features do customers want most?',
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              AI Review Intelligence Analyst
            </h1>
            <Badge variant="ai">NLP Model 4.5</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Perform complex cross-app sentiment queries, root-cause investigations, and evidence synthesis in natural language.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <ShieldCheck size={14} className="text-[var(--success-solid)]" />
            <span>91.4% Benchmark Confidence</span>
          </div>
        </div>
      </div>

      {/* Query Command Input Bar */}
      <div className="saas-card p-2 sm:p-2.5 shadow-md">
        <div className="flex items-center gap-2">
          <div className="pl-3 text-[var(--purple-text)]">
            <Sparkles size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Ask anything (e.g., 'What are the main checkout complaints on Android?')..."
            className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={!query.trim() || isAnalyzing}
            className="px-4 py-2 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] disabled:opacity-40 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>Run Analysis</span>
                <ArrowRight size={13} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sample Query Prompts by Category */}
      {!response && !isAnalyzing && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Recommended Analytical Queries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleCategories.map((cat) => (
              <div
                key={cat.category}
                className="saas-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-card)]"
              >
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[var(--text-primary)]">
                  <Zap size={14} className="text-[var(--primary-500)]" />
                  <span>{cat.category}</span>
                </div>
                <div className="space-y-2">
                  {cat.queries.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleAnalyze(q)}
                      className="w-full text-left p-2 rounded-lg bg-[var(--bg-card-subtle)] hover:bg-[var(--primary-50)] text-xs text-[var(--text-secondary)] hover:text-[var(--primary-600)] border border-[var(--border-subtle)] transition-colors line-clamp-2"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading Skeleton & Analysis State */}
      {isAnalyzing && (
        <div className="saas-card p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)] flex items-center justify-center shadow-md animate-pulse">
            <Brain size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              Synthesizing Customer Review Telemetry
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm">
              Analyzing semantic clusters, rating variance, and sentiment drift across 36,400+ reviews...
            </p>
          </div>
        </div>
      )}

      {/* Structured Enterprise Insight Output */}
      {response && !isAnalyzing && (
        <div className="saas-card p-6 border-l-4 border-l-[var(--primary-500)] shadow-lg space-y-6 animate-fade-in">
          {/* Output Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)] flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Intelligence Report: {query}
                  </h3>
                  <Badge variant="positive">Verified Ground Truth</Badge>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Evaluated against 2,000 human-labeled review benchmarks.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyAnalysis}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-app)] hover:bg-[var(--bg-card-subtle)] text-xs text-[var(--text-secondary)] transition-colors"
                title="Copy Full Analysis"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Core Findings Narrative */}
          <div className="p-4 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
              Executive Finding & Root Cause
            </h4>
            <div
              className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{
                __html: response.answer
                  .replace(/\n/g, '<br/>')
                  .replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-bold text-[var(--text-primary)]">$1</strong>'
                  ),
              }}
            />
          </div>

          {/* Evidence vs Recommendations Two-Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Supporting Customer Evidence */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                <AlertCircle size={14} className="text-[var(--danger-solid)]" />
                <span>Supporting Customer Evidence (Quotes & Citations)</span>
              </div>
              <div className="space-y-2.5">
                {response.evidence.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-secondary)] leading-relaxed"
                  >
                    <span className="font-semibold text-[var(--primary-600)] mr-1">
                      Evidence #{idx + 1}:
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                <CheckCircle size={14} className="text-[var(--success-solid)]" />
                <span>Recommended Engineering & Product Actions</span>
              </div>
              <div className="space-y-2.5">
                {response.recommendations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-[var(--success-border)] bg-[var(--success-bg)] text-xs text-[var(--success-text)] leading-relaxed flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold mr-1">Action #{idx + 1}:</span>
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

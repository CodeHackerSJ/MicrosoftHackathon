'use client';

import React, { useState } from 'react';
import { reportTemplates } from '@/data/mockData';
import Badge from '@/components/Badge';
import {
  FileText,
  Download,
  FileJson,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
  Mail,
} from 'lucide-react';

export default function ReportsPage() {
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleGenerate = (id: string, name: string) => {
    setGeneratingId(id);
    setTimeout(() => {
      setGeneratingId(null);
      alert(`Report "${name}" successfully generated and ready for download.`);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Intelligence Reports & Exports
            </h1>
            <Badge variant="primary">Automated Delivery Active</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Generate, schedule, and export comprehensive review intelligence summaries for stakeholders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Scheduled Email Digest: Weekly Monday 9:00 AM UTC configured for leadership.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] transition-colors shadow-sm"
          >
            <Mail size={13} />
            <span>Email Schedules</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportTemplates.map((report) => (
          <div
            key={report.id}
            className="saas-card p-5 flex flex-col justify-between hover:border-[var(--border-app)] hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-xl shrink-0">
                  {report.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    {report.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] mt-0.5">
                    <Clock size={11} />
                    <span>Last run: {report.lastGenerated}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                {report.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2">
              <button
                onClick={() => handleGenerate(report.id, report.name)}
                disabled={generatingId === report.id}
                className="flex-1 py-2 px-3 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {generatingId === report.id ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    <span>Generate</span>
                  </>
                )}
              </button>

              <button
                onClick={() => alert(`Downloading ${report.name} as PDF...`)}
                className="py-2 px-3 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] transition-colors flex items-center gap-1.5 shadow-sm"
                title="Download PDF"
              >
                <Download size={13} />
                <span>PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

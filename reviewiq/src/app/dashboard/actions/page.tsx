'use client';

import React, { useState } from 'react';
import { actionItems } from '@/data/mockData';
import Badge from '@/components/Badge';
import MetricCard from '@/components/MetricCard';
import {
  CheckSquare,
  AlertCircle,
  Clock,
  Users,
  ArrowRight,
  Plus,
  ExternalLink,
  Layers,
  Filter,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import Link from 'next/link';

export default function ActionCenterPage() {
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [items, setItems] = useState(actionItems);

  const filteredItems = items.filter((item) => {
    const matchPri = filterPriority === 'all' || item.priority === filterPriority;
    const matchStat = filterStatus === 'all' || item.status === filterStatus;
    return matchPri && matchStat;
  });

  const updateStatus = (id: string, newStatus: 'open' | 'in-progress' | 'resolved') => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: newStatus as any } : it))
    );
  };

  const criticalCount = items.filter((i) => i.priority === 'critical').length;
  const inProgressCount = items.filter((i) => i.status === 'in-progress').length;
  const openCount = items.filter((i) => i.status === 'open').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Action Center & Task Operationalization
            </h1>
            <Badge variant="primary">{items.length} Tracked Actions</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            AI-prioritized engineering work items generated from real customer feedback & churn correlations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Jira / Linear bi-directional sync triggered: 7 issues synchronized.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] transition-colors shadow-sm"
          >
            <Share2 size={13} />
            <span>Sync with Jira</span>
          </button>
          <button
            onClick={() => alert('New Action modal opened.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>New Action</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Open Engineering Tasks"
          value={openCount}
          trendLabel="Ready for sprint planning"
          icon={<CheckSquare size={16} />}
          color="blue"
        />
        <MetricCard
          title="Critical Priority"
          value={criticalCount}
          trendLabel="Requires immediate hotfix"
          icon={<AlertCircle size={16} />}
          color="red"
        />
        <MetricCard
          title="In-Progress Work"
          value={inProgressCount}
          trendLabel="Active engineering branches"
          icon={<Clock size={16} />}
          color="warning"
        />
        <MetricCard
          title="Connected Teams"
          value="5 Squads"
          trendLabel="Payments, Mobile, Backend, CS, Design"
          icon={<Users size={16} />}
          color="green"
        />
      </div>

      {/* Filter Toolbar */}
      <div className="saas-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="font-semibold text-[var(--text-muted)] mr-1 uppercase tracking-wider text-[11px]">
            Priority:
          </span>
          {['all', 'critical', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-colors ${
                filterPriority === p
                  ? 'bg-[var(--primary-600)] text-white font-semibold'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="font-semibold text-[var(--text-muted)] mr-1 uppercase tracking-wider text-[11px]">
            Status:
          </span>
          {['all', 'open', 'in-progress'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-colors ${
                filterStatus === s
                  ? 'bg-[var(--primary-600)] text-white font-semibold'
                  : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)]'
              }`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-3.5">
        {filteredItems.map((action) => (
          <div
            key={action.id}
            className="saas-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-[var(--border-app)] transition-all"
          >
            <div className="flex-1 min-w-0">
              {/* Badge Meta Row */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge
                  variant={
                    action.priority === 'critical'
                      ? 'critical'
                      : action.priority === 'high'
                      ? 'high'
                      : action.priority === 'medium'
                      ? 'medium'
                      : 'low'
                  }
                >
                  {action.priority} Priority
                </Badge>
                <span className="text-[11px] font-semibold text-[var(--text-primary)] px-2 py-0.5 rounded bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
                  {action.team}
                </span>
                <Badge variant={action.status === 'in-progress' ? 'neutral' : 'outline'}>
                  {action.status === 'in-progress' ? 'In Progress' : 'Open Backlog'}
                </Badge>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                {action.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                {action.description}
              </p>

              {/* Telemetry Footer */}
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] flex-wrap">
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-[var(--text-muted)]" />
                  <span><strong>{action.mentions.toLocaleString()}</strong> Customer Mentions</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <AlertCircle
                    size={13}
                    className={
                      action.churnRisk === 'high'
                        ? 'text-[var(--danger-solid)]'
                        : 'text-[var(--warning-solid)]'
                    }
                  />
                  <span>
                    Churn Risk:{' '}
                    <strong className="capitalize text-[var(--text-primary)]">
                      {action.churnRisk}
                    </strong>
                  </span>
                </span>
                <span>•</span>
                <span>
                  Business Impact: <strong className="capitalize text-[var(--text-primary)]">{action.impact}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="flex sm:flex-row lg:flex-col gap-2 shrink-0 self-start lg:self-center w-full lg:w-44 pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--border-subtle)]">
              {action.status === 'open' ? (
                <button
                  onClick={() => updateStatus(action.id, 'in-progress')}
                  className="flex-1 lg:w-full py-1.5 px-3 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-colors text-center"
                >
                  Start Task
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(action.id, 'resolved')}
                  className="flex-1 lg:w-full py-1.5 px-3 rounded-lg bg-[var(--success-solid)] hover:bg-emerald-600 text-white text-xs font-semibold transition-colors text-center"
                >
                  Mark Resolved
                </button>
              )}

              <Link
                href="/dashboard/reviews"
                className="flex-1 lg:w-full py-1.5 px-3 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-secondary)] transition-colors text-center"
              >
                View Citations
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Search,
  Calendar,
  Layers,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Command,
} from 'lucide-react';

const routeTitleMap: Record<string, { title: string; category: string }> = {
  '/dashboard': { title: 'Executive Overview', category: 'Core' },
  '/dashboard/applications': { title: 'Applications & Products', category: 'Core' },
  '/dashboard/reviews': { title: 'Review Explorer', category: 'Core' },
  '/dashboard/sentiment': { title: 'Sentiment Intelligence', category: 'Intelligence' },
  '/dashboard/ai-analyzer': { title: 'AI Review Analyst', category: 'Intelligence' },
  '/dashboard/churn': { title: 'Customer Churn Intelligence', category: 'Intelligence' },
  '/dashboard/business': { title: 'Business Insights', category: 'Insights' },
  '/dashboard/marketing': { title: 'Marketing Intelligence', category: 'Insights' },
  '/dashboard/actions': { title: 'Action Center & Tasks', category: 'Operations' },
  '/dashboard/ai-quality': { title: 'AI Quality & Governance', category: 'System' },
  '/dashboard/trends': { title: 'Trend & Drift Telemetry', category: 'Insights' },
  '/dashboard/reports': { title: 'Intelligence Reports', category: 'Operations' },
  '/dashboard/settings': { title: 'Workspace Settings', category: 'System' },
};

export default function TopHeader() {
  const pathname = usePathname();
  const {
    dateRange,
    setDateRange,
    selectedPlatform,
    setPlatform,
    globalSearch,
    setGlobalSearch,
  } = useAppContext();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const routeInfo = routeTitleMap[pathname] || {
    title: pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard',
    category: 'Workspace',
  };

  const notifications = [
    {
      id: 1,
      title: 'High Churn Drift Detected',
      desc: 'Payment failure complaints increased +24% after v4.2 release.',
      time: '12m ago',
      unread: true,
      type: 'warning',
    },
    {
      id: 2,
      title: 'Review Ingestion Completed',
      desc: '1,420 new reviews synced from Google Play & App Store.',
      time: '1h ago',
      unread: false,
      type: 'success',
    },
    {
      id: 3,
      title: 'Model Evaluation Passed',
      desc: 'AI accuracy benchmark at 91.4% with zero semantic drift.',
      time: '3h ago',
      unread: false,
      type: 'info',
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[var(--border-app)] bg-[var(--bg-header)] backdrop-blur-md px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Breadcrumbs & Status */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
          <span>{routeInfo.category}</span>
          <span className="text-[var(--text-tertiary)]">/</span>
          <span className="text-[var(--text-primary)] font-semibold truncate">
            {routeInfo.title}
          </span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] text-[11px] font-medium text-[var(--success-text)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-solid)] animate-pulse" />
          <span>Live Ingestion</span>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-2">
        <div className="relative w-full">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search reviews, themes, pain points, or apps..."
            className="w-full pl-9 pr-14 py-1.5 text-xs rounded-lg saas-input placeholder:text-[var(--text-tertiary)]"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[var(--border-app)] bg-[var(--bg-card-subtle)] text-[10px] text-[var(--text-muted)] font-mono">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Platform Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPlatformOpen(!platformOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] transition-colors"
          >
            <Layers size={13} className="text-[var(--text-muted)]" />
            <span className="capitalize">
              {selectedPlatform === 'all' ? 'All Platforms' : selectedPlatform}
            </span>
            <ChevronDown size={12} className="text-[var(--text-muted)]" />
          </button>

          {platformOpen && (
            <div className="absolute right-0 mt-1.5 w-40 rounded-lg border border-[var(--border-card)] bg-[var(--bg-elevated)] shadow-lg py-1 z-50 animate-fade-in">
              {(['all', 'android', 'ios'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPlatform(p);
                    setPlatformOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                    selectedPlatform === p
                      ? 'bg-[var(--primary-50)] text-[var(--primary-600)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <span className="capitalize">{p === 'all' ? 'All Platforms' : p}</span>
                  {selectedPlatform === p && <CheckCircle2 size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Selector */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setDateOpen(!dateOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] transition-colors"
          >
            <Calendar size={13} className="text-[var(--text-muted)]" />
            <span>
              {dateRange === '7d'
                ? 'Last 7 Days'
                : dateRange === '14d'
                ? 'Last 14 Days'
                : dateRange === '30d'
                ? 'Last 30 Days'
                : dateRange === '90d'
                ? 'Last 90 Days'
                : 'Custom'}
            </span>
            <ChevronDown size={12} className="text-[var(--text-muted)]" />
          </button>

          {dateOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-lg border border-[var(--border-card)] bg-[var(--bg-elevated)] shadow-lg py-1 z-50 animate-fade-in">
              {[
                { id: '7d', label: 'Last 7 Days' },
                { id: '14d', label: 'Last 14 Days' },
                { id: '30d', label: 'Last 30 Days' },
                { id: '90d', label: 'Last 90 Days' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDateRange(item.id as any);
                    setDateOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                    dateRange === item.id
                      ? 'bg-[var(--primary-50)] text-[var(--primary-600)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {dateRange === item.id && <CheckCircle2 size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] transition-colors"
            aria-label="View notifications"
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--danger-solid)]" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[var(--border-card)] bg-[var(--bg-elevated)] shadow-xl p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] mb-2">
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  Intelligence Notifications
                </span>
                <span className="text-[10px] text-[var(--primary-600)] font-semibold cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      n.unread
                        ? 'bg-[var(--primary-50)] border-[var(--primary-100)]'
                        : 'bg-[var(--bg-card-subtle)] border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[var(--text-tertiary)]">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}

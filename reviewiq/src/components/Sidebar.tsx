'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import {
  LayoutDashboard,
  AppWindow,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  Briefcase,
  Megaphone,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  Target,
  TrendingUp,
  Building2,
  ChevronDown,
  Check,
  Zap,
} from 'lucide-react';

interface NavGroup {
  group: string;
  items: {
    href: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const navGroups: NavGroup[] = [
  {
    group: 'CORE',
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
      { href: '/dashboard/applications', label: 'Applications', icon: AppWindow },
    ],
  },
  {
    group: 'INTELLIGENCE',
    items: [
      { href: '/dashboard/sentiment', label: 'Sentiment', icon: BarChart3 },
      { href: '/dashboard/ai-analyzer', label: 'AI Analyzer', icon: Brain, badge: 'AI' },
      { href: '/dashboard/churn', label: 'Customer Intelligence', icon: Users },
    ],
  },
  {
    group: 'INSIGHTS',
    items: [
      { href: '/dashboard/business', label: 'Business Insights', icon: Briefcase },
      { href: '/dashboard/marketing', label: 'Marketing Intelligence', icon: Megaphone },
      { href: '/dashboard/trends', label: 'Trends & Drift', icon: TrendingUp },
    ],
  },
  {
    group: 'OPERATIONS',
    items: [
      { href: '/dashboard/actions', label: 'Action Center', icon: Target },
      { href: '/dashboard/reports', label: 'Reports', icon: FileText },
    ],
  },
  {
    group: 'SYSTEM',
    items: [
      { href: '/dashboard/ai-quality', label: 'AI Quality', icon: Shield },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const {
    companyName,
    userName,
    userEmail,
    sidebarCollapsed,
    toggleSidebar,
    logout,
    selectedAppId,
    selectApp,
    selectedPlatform,
    setPlatform,
  } = useAppContext();
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false);

  const appOptions = [
    { id: null, label: 'All Applications', icon: '🌐' },
    { id: 'app-a-android', label: 'FinanceFlow (Android)', icon: '💳' },
    { id: 'app-a-ios', label: 'FinanceFlow (iOS)', icon: '💳' },
    { id: 'app-b-android', label: 'ShopSmart (Android)', icon: '🛒' },
    { id: 'app-c-android', label: 'TaskMaster Pro (Android)', icon: '⚡' },
    { id: 'app-c-ios', label: 'TaskMaster Pro (iOS)', icon: '⚡' },
  ];

  const currentApp = appOptions.find((a) => a.id === selectedAppId) || appOptions[0];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen border-r border-[var(--border-app)] bg-[var(--bg-sidebar)] flex flex-col z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'w-[70px]' : 'w-[260px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-app)] shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary-600)] flex items-center justify-center text-white shadow-sm shrink-0 font-bold text-sm">
            <span className="tracking-tighter">IQ</span>
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0 flex flex-col">
              <span className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                ReviewIQ
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
                Enterprise
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* App & Workspace Switcher */}
      {!sidebarCollapsed && (
        <div className="px-3 py-2.5 border-b border-[var(--border-app)]">
          <button
            onClick={() => setAppSwitcherOpen(!appSwitcherOpen)}
            className="w-full flex items-center justify-between p-2 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm shrink-0">{currentApp.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  {currentApp.label}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">
                  {companyName}
                </p>
              </div>
            </div>
            <ChevronDown
              size={13}
              className={`text-[var(--text-muted)] shrink-0 transition-transform ${
                appSwitcherOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {appSwitcherOpen && (
            <div className="mt-1.5 rounded-lg border border-[var(--border-card)] bg-[var(--bg-elevated)] shadow-lg overflow-hidden z-50 animate-fade-in">
              <div className="py-1 max-h-48 overflow-y-auto">
                {appOptions.map((opt) => (
                  <button
                    key={opt.id ?? 'all'}
                    onClick={() => {
                      selectApp(opt.id);
                      setAppSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                      selectedAppId === opt.id
                        ? 'bg-[var(--primary-50)] text-[var(--primary-600)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{opt.icon}</span>
                      <span className="truncate">{opt.label}</span>
                    </div>
                    {selectedAppId === opt.id && <Check size={12} />}
                  </button>
                ))}
              </div>

              <div className="border-t border-[var(--border-app)] p-1.5 bg-[var(--bg-card-subtle)] flex gap-1">
                {(['all', 'android', 'ios'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`flex-1 text-[10px] py-1 rounded font-semibold transition-colors ${
                      selectedPlatform === p
                        ? 'bg-[var(--bg-card)] text-[var(--primary-600)] shadow-sm border border-[var(--border-app)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {p === 'all' ? 'All' : p === 'android' ? 'Android' : 'iOS'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Categorized Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((grp) => (
          <div key={grp.group} className="space-y-0.5">
            {!sidebarCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-bold text-[var(--text-tertiary)] tracking-wider uppercase">
                {grp.group}
              </div>
            )}
            <ul className="space-y-0.5">
              {grp.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group relative ${
                        isActive
                          ? 'bg-[var(--primary-50)] text-[var(--primary-600)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                      }`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-[var(--primary-500)]" />
                      )}
                      <item.icon
                        size={16}
                        className={`shrink-0 ${
                          isActive
                            ? 'text-[var(--primary-600)]'
                            : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--purple-bg)] text-[var(--purple-text)] border border-[var(--purple-border)] font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Profile & Sidebar Collapse */}
      <div className="border-t border-[var(--border-app)] p-3 shrink-0 bg-[var(--bg-sidebar)]">
        {!sidebarCollapsed && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] mb-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[var(--primary-600)] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                {userName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  {userName}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">
                  {userEmail}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--danger-text)] hover:bg-[var(--danger-bg)] transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-1">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center py-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors text-xs gap-1"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight size={15} />
            ) : (
              <>
                <ChevronLeft size={15} />
                <span>Collapse Menu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

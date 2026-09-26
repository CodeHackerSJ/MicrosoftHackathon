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
  Sparkles,
  Building2,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/applications', label: 'Applications', icon: AppWindow },
  { href: '/dashboard/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/dashboard/sentiment', label: 'Sentiment', icon: BarChart3 },
  { href: '/dashboard/ai-analyzer', label: 'AI Analyzer', icon: Brain },
  { href: '/dashboard/churn', label: 'Customer Intelligence', icon: Users },
  { href: '/dashboard/business', label: 'Business Insights', icon: Briefcase },
  { href: '/dashboard/marketing', label: 'Marketing Intelligence', icon: Megaphone },
  { href: '/dashboard/actions', label: 'Action Center', icon: Target },
  { href: '/dashboard/ai-quality', label: 'AI Quality', icon: Shield },
  { href: '/dashboard/trends', label: 'Trends & Drift', icon: TrendingUp },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { companyName, sidebarCollapsed, toggleSidebar, logout, selectedAppId, selectApp, selectedPlatform, setPlatform } = useAppContext();
  const [appSwitcherOpen, setAppSwitcherOpen] = useState(false);

  const appOptions = [
    { id: null, label: 'All Applications' },
    { id: 'app-a-android', label: 'FinanceFlow (Android)' },
    { id: 'app-a-ios', label: 'FinanceFlow (iOS)' },
    { id: 'app-b-android', label: 'ShopSmart (Android)' },
    { id: 'app-c-android', label: 'TaskMaster Pro (Android)' },
    { id: 'app-c-ios', label: 'TaskMaster Pro (iOS)' },
  ];

  const currentApp = appOptions.find((a) => a.id === selectedAppId) || appOptions[0];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-navy-900 border-r border-white/5 flex flex-col z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'w-[68px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg ai-gradient flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <span className="text-base font-bold text-slate-50 tracking-tight">ReviewIQ</span>
            </div>
          )}
        </Link>
      </div>

      {/* Company & App Switcher */}
      {!sidebarCollapsed && (
        <div className="px-3 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
            <Building2 size={14} className="text-electric-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{companyName}</p>
              <p className="text-[10px] text-slate-500">Enterprise Account</p>
            </div>
          </div>

          <button
            onClick={() => setAppSwitcherOpen(!appSwitcherOpen)}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-md bg-navy-800/60 hover:bg-navy-700/60 transition-colors text-left"
          >
            <span className="text-xs text-slate-300 truncate">{currentApp.label}</span>
            <ChevronDown size={12} className={`text-slate-500 transition-transform ${appSwitcherOpen ? 'rotate-180' : ''}`} />
          </button>

          {appSwitcherOpen && (
            <div className="mt-1 rounded-md bg-navy-800 border border-white/5 overflow-hidden">
              {appOptions.map((opt) => (
                <button
                  key={opt.id ?? 'all'}
                  onClick={() => {
                    selectApp(opt.id);
                    setAppSwitcherOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                    selectedAppId === opt.id
                      ? 'bg-electric-500/10 text-electric-400'
                      : 'text-slate-400 hover:bg-navy-700/60 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <div className="border-t border-white/5 p-2 flex gap-1">
                {(['all', 'android', 'ios'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`flex-1 text-[10px] py-1 rounded font-medium transition-colors ${
                      selectedPlatform === p
                        ? 'bg-electric-500/20 text-electric-400'
                        : 'text-slate-500 hover:text-slate-300'
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-electric-500/10 text-electric-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-electric-500" />
                  )}
                  <item.icon size={18} className="shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-3 shrink-0">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2.5 px-2 py-1.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              CX
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{companyName} Admin</p>
              <p className="text-[10px] text-slate-500">admin@companyx.com</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleSidebar}
            className="flex-1 flex items-center justify-center py-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          {!sidebarCollapsed && (
            <button
              onClick={logout}
              className="flex items-center justify-center py-1.5 px-3 rounded-md text-slate-500 hover:text-danger-400 hover:bg-danger-500/10 transition-colors"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

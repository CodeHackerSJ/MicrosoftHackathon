'use client';

import React from 'react';
import { useAppContext, ThemeMode } from '@/context/AppContext';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useAppContext();

  if (compact) {
    return (
      <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700/50"
        title={`Current theme: ${resolvedTheme}. Click to toggle.`}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun size={16} className="text-amber-400" />
        ) : (
          <Moon size={16} className="text-slate-600" />
        )}
      </button>
    );
  }

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun size={13} /> },
    { mode: 'dark', label: 'Dark', icon: <Moon size={13} /> },
    { mode: 'system', label: 'System', icon: <Monitor size={13} /> },
  ];

  return (
    <div
      className="inline-flex items-center p-0.5 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card-subtle)]"
      role="group"
      aria-label="Theme selector"
    >
      {options.map((opt) => {
        const isActive = theme === opt.mode;
        return (
          <button
            key={opt.mode}
            onClick={() => setTheme(opt.mode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              isActive
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border-app)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

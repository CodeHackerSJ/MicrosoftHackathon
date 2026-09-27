'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { applications, type AppData } from '@/data/mockData';

export type ThemeMode = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

interface AppState {
  isAuthenticated: boolean;
  companyName: string;
  userName: string;
  userEmail: string;
  selectedAppId: string | null;
  selectedPlatform: 'all' | 'android' | 'ios';
  dateRange: '7d' | '14d' | '30d' | '90d' | 'custom';
  sidebarCollapsed: boolean;
  chatbotOpen: boolean;
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  globalSearch: string;
}

interface AppContextType extends AppState {
  login: (email?: string) => void;
  logout: () => void;
  selectApp: (id: string | null) => void;
  setPlatform: (p: 'all' | 'android' | 'ios') => void;
  setDateRange: (r: '7d' | '14d' | '30d' | '90d' | 'custom') => void;
  toggleSidebar: () => void;
  toggleChatbot: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setGlobalSearch: (q: string) => void;
  getSelectedApp: () => AppData | undefined;
  getFilteredApps: () => AppData[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');
  const [state, setState] = useState({
    isAuthenticated: false,
    companyName: 'Acme Technologies',
    userName: 'Alex Rivera',
    userEmail: 'alex.rivera@acmetech.com',
    selectedAppId: null as string | null,
    selectedPlatform: 'all' as 'all' | 'android' | 'ios',
    dateRange: '30d' as '7d' | '14d' | '30d' | '90d' | 'custom',
    sidebarCollapsed: false,
    chatbotOpen: false,
    globalSearch: '',
  });

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('reviewiq_theme') as ThemeMode | null;
      const initialTheme = savedTheme || 'dark';
      setThemeState(initialTheme);
      applyTheme(initialTheme);
    } catch {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (targetTheme: ThemeMode) => {
    let effective: ResolvedTheme = 'dark';
    if (targetTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effective = prefersDark ? 'dark' : 'light';
    } else {
      effective = targetTheme;
    }

    setResolvedTheme(effective);
    const root = document.documentElement;
    if (effective === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('reviewiq_theme', newTheme);
    } catch {}
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const login = (email?: string) => {
    setState((s) => ({
      ...s,
      isAuthenticated: true,
      userEmail: email || s.userEmail,
    }));
  };

  const logout = () => setState((s) => ({ ...s, isAuthenticated: false }));
  const selectApp = (id: string | null) => setState((s) => ({ ...s, selectedAppId: id }));
  const setPlatform = (p: 'all' | 'android' | 'ios') => setState((s) => ({ ...s, selectedPlatform: p }));
  const setDateRange = (r: '7d' | '14d' | '30d' | '90d' | 'custom') => setState((s) => ({ ...s, dateRange: r }));
  const toggleSidebar = () => setState((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }));
  const toggleChatbot = () => setState((s) => ({ ...s, chatbotOpen: !s.chatbotOpen }));
  const setGlobalSearch = (q: string) => setState((s) => ({ ...s, globalSearch: q }));

  const getSelectedApp = () => applications.find((a) => a.id === state.selectedAppId);

  const getFilteredApps = () => {
    if (state.selectedPlatform === 'all') return applications;
    return applications.filter((a) => a.platform === state.selectedPlatform);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        theme,
        resolvedTheme,
        login,
        logout,
        selectApp,
        setPlatform,
        setDateRange,
        toggleSidebar,
        toggleChatbot,
        setTheme,
        toggleTheme,
        setGlobalSearch,
        getSelectedApp,
        getFilteredApps,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

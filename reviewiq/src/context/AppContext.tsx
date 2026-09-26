'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { applications, type AppData } from '@/data/mockData';

interface AppState {
  isAuthenticated: boolean;
  companyName: string;
  userName: string;
  selectedAppId: string | null;
  selectedPlatform: 'all' | 'android' | 'ios';
  dateRange: '7d' | '30d' | '90d' | 'custom';
  sidebarCollapsed: boolean;
  chatbotOpen: boolean;
}

interface AppContextType extends AppState {
  login: () => void;
  logout: () => void;
  selectApp: (id: string | null) => void;
  setPlatform: (p: 'all' | 'android' | 'ios') => void;
  setDateRange: (r: '7d' | '30d' | '90d' | 'custom') => void;
  toggleSidebar: () => void;
  toggleChatbot: () => void;
  getSelectedApp: () => AppData | undefined;
  getFilteredApps: () => AppData[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isAuthenticated: false,
    companyName: 'Company X',
    userName: 'Admin',
    selectedAppId: null,
    selectedPlatform: 'all',
    dateRange: '30d',
    sidebarCollapsed: false,
    chatbotOpen: false,
  });

  const login = () => setState((s) => ({ ...s, isAuthenticated: true }));
  const logout = () => setState((s) => ({ ...s, isAuthenticated: false }));
  const selectApp = (id: string | null) => setState((s) => ({ ...s, selectedAppId: id }));
  const setPlatform = (p: 'all' | 'android' | 'ios') => setState((s) => ({ ...s, selectedPlatform: p }));
  const setDateRange = (r: '7d' | '30d' | '90d' | 'custom') => setState((s) => ({ ...s, dateRange: r }));
  const toggleSidebar = () => setState((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }));
  const toggleChatbot = () => setState((s) => ({ ...s, chatbotOpen: !s.chatbotOpen }));

  const getSelectedApp = () => applications.find((a) => a.id === state.selectedAppId);

  const getFilteredApps = () => {
    if (state.selectedPlatform === 'all') return applications;
    return applications.filter((a) => a.platform === state.selectedPlatform);
  };

  return (
    <AppContext.Provider
      value={{ ...state, login, logout, selectApp, setPlatform, setDateRange, toggleSidebar, toggleChatbot, getSelectedApp, getFilteredApps }}
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

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';
import Chatbot from '@/components/Chatbot';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, sidebarCollapsed } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)]">
      <Sidebar />
      <div
        className={`transition-all duration-300 min-h-screen flex flex-col ${
          sidebarCollapsed ? 'ml-[70px]' : 'ml-[260px]'
        }`}
      >
        <TopHeader />
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}

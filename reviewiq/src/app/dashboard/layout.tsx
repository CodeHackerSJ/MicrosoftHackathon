'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
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
    <div className="min-h-screen bg-navy-950">
      <Sidebar />
      <main
        className={`transition-all duration-300 min-h-screen ${
          sidebarCollapsed ? 'ml-[68px]' : 'ml-[260px]'
        }`}
      >
        <div className="p-6 lg:p-8 max-w-[1600px]">
          {children}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}

'use client';

import React from 'react';
import { reportTemplates } from '@/data/mockData';
import { FileText, Download, FileJson } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <FileText size={28} className="text-blue-400" /> Reports
        </h1>
        <p className="text-slate-400 mt-1">Generate and export comprehensive intelligence reports.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {reportTemplates.map((report) => (
            <div key={report.id} className="glass-card-hover rounded-xl p-5 flex flex-col h-full">
               <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{report.icon}</div>
                  <div>
                     <h3 className="text-base font-bold text-slate-100">{report.name}</h3>
                     <p className="text-[10px] text-slate-500 mt-0.5">Last generated: {report.lastGenerated}</p>
                  </div>
               </div>
               
               <p className="text-xs text-slate-400 mb-6 flex-1">
                  {report.description}
               </p>
               
               <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button className="flex items-center justify-center gap-1.5 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg text-xs font-semibold transition-colors">
                     Generate
                  </button>
                  <button className="flex items-center justify-center gap-1.5 py-2 bg-navy-800 hover:bg-navy-700 border border-white/10 text-slate-300 rounded-lg text-xs font-semibold transition-colors">
                     <Download size={12} /> PDF
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}

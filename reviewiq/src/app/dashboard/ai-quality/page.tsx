'use client';

import React from 'react';
import { Shield, CheckCircle2, ShieldCheck, FileKey, Server } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

export default function AIQualityPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <Shield size={28} className="text-success-400" /> AI Quality & Validation
        </h1>
        <p className="text-slate-400 mt-1">Enterprise-grade model validation metrics and privacy controls.</p>
      </header>

      <div className="bg-electric-500/10 border border-electric-500/20 rounded-lg p-3 text-xs text-electric-400 flex items-center gap-2 mb-6">
         <CheckCircle2 size={16} /> Metrics shown are based on the validation dataset used for this demonstration.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
         <KpiCard title="Model Accuracy" value="91.4%" color="blue" delay={0} />
         <KpiCard title="Precision" value="90.2%" color="cyan" delay={50} />
         <KpiCard title="Recall" value="89.8%" color="purple" delay={100} />
         <KpiCard title="F1 Score" value="90.0%" color="green" delay={150} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
               <ShieldCheck size={18} className="text-success-400" /> Data Privacy & PII
            </h3>
            
            <div className="space-y-4">
               <div className="flex justify-between items-center p-3 bg-navy-800/50 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                     <FileKey size={16} className="text-slate-400" />
                     <span className="text-sm text-slate-200">PII Detection & Redaction</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-success-500/20 text-success-400 font-semibold rounded uppercase">Enabled</span>
               </div>
               
               <div className="flex justify-between items-center p-3 bg-navy-800/50 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                     <Server size={16} className="text-slate-400" />
                     <span className="text-sm text-slate-200">Data Retention Period</span>
                  </div>
                  <span className="text-xs text-slate-300 font-medium">90 Days</span>
               </div>
               
               <div className="p-3">
                  <div className="text-3xl font-bold text-warning-400 mb-1">243</div>
                  <div className="text-xs text-slate-400">Sensitive entities automatically redacted this month (Names, Emails, Phone numbers)</div>
               </div>
            </div>
         </div>

         <div className="glass-card rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Model Validation Sample</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
               Our sentiment and theme detection models are continuously evaluated against a human-labeled ground truth dataset of <strong>2,000 recent reviews</strong> to ensure zero drift and high reliability across domains.
            </p>
            <div className="w-full h-32 bg-navy-800 rounded-lg border border-white/5 flex items-center justify-center flex-col gap-2">
               <div className="flex items-center gap-2 text-success-400 text-sm font-semibold">
                  <CheckCircle2 size={16} /> Evaluation Passed
               </div>
               <div className="text-xs text-slate-500">Last evaluated: Today, 08:00 AM</div>
            </div>
         </div>
      </div>
    </div>
  );
}

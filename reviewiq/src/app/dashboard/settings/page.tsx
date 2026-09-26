'use client';

import React from 'react';
import { Settings, User, Building, Bell, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-3">
           <Settings size={28} className="text-slate-300" /> Settings
        </h1>
        <p className="text-slate-400 mt-1">Manage your account and workspace preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="space-y-2">
            <button className="w-full text-left px-4 py-2.5 rounded-lg bg-electric-500/10 text-electric-400 font-medium text-sm flex items-center gap-3">
               <Building size={16} /> Workspace
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 hover:bg-navy-800 hover:text-slate-200 font-medium text-sm transition-colors flex items-center gap-3">
               <User size={16} /> Profile
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 hover:bg-navy-800 hover:text-slate-200 font-medium text-sm transition-colors flex items-center gap-3">
               <Bell size={16} /> Notifications
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 hover:bg-navy-800 hover:text-slate-200 font-medium text-sm transition-colors flex items-center gap-3">
               <Lock size={16} /> Security
            </button>
         </div>

         <div className="md:col-span-3 space-y-6">
            <div className="glass-card rounded-xl p-6">
               <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-white/5 pb-3">Workspace Profile</h3>
               
               <div className="space-y-4 max-w-md">
                  <div>
                     <label className="block text-xs font-medium text-slate-400 mb-1.5">Company Name</label>
                     <input type="text" defaultValue="Company X" className="w-full px-4 py-2 bg-navy-800 border border-white/10 rounded-lg text-sm text-slate-200 outline-none focus:border-electric-500/50" />
                  </div>
                  <div>
                     <label className="block text-xs font-medium text-slate-400 mb-1.5">Industry</label>
                     <select className="w-full px-4 py-2 bg-navy-800 border border-white/10 rounded-lg text-sm text-slate-200 outline-none focus:border-electric-500/50">
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Retail</option>
                     </select>
                  </div>
                  
                  <button className="px-6 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg text-sm font-semibold transition-colors mt-2">
                     Save Changes
                  </button>
               </div>
            </div>

            <div className="glass-card rounded-xl p-6">
               <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-white/5 pb-3">Data Sources</h3>
               <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-navy-800/50 rounded-lg border border-white/5">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-success-500/10 flex items-center justify-center text-success-400 font-bold text-xs">GPlay</div>
                        <div>
                           <div className="text-sm text-slate-200 font-medium">Google Play Store Sync</div>
                           <div className="text-[10px] text-slate-500">Last synced: 2 hours ago</div>
                        </div>
                     </div>
                     <button className="text-xs px-3 py-1.5 border border-white/10 rounded hover:bg-white/5 text-slate-300">Manage</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-navy-800/50 rounded-lg border border-white/5">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold text-xs">App</div>
                        <div>
                           <div className="text-sm text-slate-200 font-medium">Apple App Store Sync</div>
                           <div className="text-[10px] text-slate-500">Last synced: 2 hours ago</div>
                        </div>
                     </div>
                     <button className="text-xs px-3 py-1.5 border border-white/10 rounded hover:bg-white/5 text-slate-300">Manage</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

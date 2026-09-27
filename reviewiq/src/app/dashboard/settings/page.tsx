'use client';

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import Badge from '@/components/Badge';
import {
  Settings,
  User,
  Building,
  Bell,
  Lock,
  Smartphone,
  Apple,
  CheckCircle2,
  Key,
  Shield,
  Save,
  Users,
} from 'lucide-react';

export default function SettingsPage() {
  const { companyName, userName, userEmail } = useAppContext();
  const [activeTab, setActiveTab] = useState<'workspace' | 'sources' | 'team' | 'security'>('workspace');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const navTabs = [
    { id: 'workspace', label: 'Workspace Profile', icon: Building },
    { id: 'sources', label: 'Data Sources & Sync', icon: Smartphone },
    { id: 'team', label: 'Team Members & Roles', icon: Users },
    { id: 'security', label: 'Security & API Keys', icon: Lock },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-app)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Workspace & Account Settings
            </h1>
            <Badge variant="primary">Enterprise Tier</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Manage organization details, store webhook credentials, and user permissions.
          </p>
        </div>

        {savedMessage && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--success-bg)] border border-[var(--success-border)] text-xs font-semibold text-[var(--success-text)] animate-fade-in">
            <CheckCircle2 size={14} />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-1">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--primary-100)] font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'workspace' && (
            <div className="saas-card p-6 space-y-5">
              <div className="pb-3 border-b border-[var(--border-subtle)]">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Organization Profile
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  General workspace metadata used across reports and intelligence exports.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue={companyName}
                    className="w-full px-3 py-2 text-xs saas-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Industry Sector
                  </label>
                  <select className="w-full px-3 py-2 text-xs saas-input bg-[var(--bg-input)]">
                    <option>Technology & SaaS</option>
                    <option>Financial Services & Fintech</option>
                    <option>E-Commerce & Retail</option>
                    <option>Healthcare & Telehealth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Primary Data Residency Region
                  </label>
                  <select className="w-full px-3 py-2 text-xs saas-input bg-[var(--bg-input)]">
                    <option>US-East (N. Virginia) · SOC 2</option>
                    <option>EU-Central (Frankfurt) · GDPR Compliant</option>
                    <option>AP-South (Mumbai)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Save size={13} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="saas-card p-6 space-y-5">
              <div className="pb-3 border-b border-[var(--border-subtle)]">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Connected Store Endpoints & Ingestion Sync
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Automated scraping and webhook pipelines for mobile store reviews.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--text-primary)]">
                          Google Play Developer API
                        </span>
                        <Badge variant="positive">Connected</Badge>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Sync frequency: Real-time webhooks · 3 Apps connected · Last sync 4m ago
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Google Play Store sync settings opened.')}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border-app)] hover:bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)] transition-colors"
                  >
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-500/10 text-slate-400 flex items-center justify-center font-bold text-sm">
                      <Apple size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--text-primary)]">
                          Apple App Store Connect
                        </span>
                        <Badge variant="positive">Connected</Badge>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Sync frequency: Hourly polling · 2 Apps connected · Last sync 12m ago
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Apple App Store sync settings opened.')}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border-app)] hover:bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)] transition-colors"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="saas-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Team Members & RBAC Permissions
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Manage team access and role-based permissions.
                  </p>
                </div>
                <button
                  onClick={() => alert('Invite member modal opened.')}
                  className="px-3 py-1.5 rounded-lg bg-[var(--primary-600)] text-white text-xs font-semibold"
                >
                  + Invite Member
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: userName, email: userEmail, role: 'Super Admin', status: 'Active' },
                  { name: 'Sarah Jenkins', email: 's.jenkins@acmetech.com', role: 'Product Lead', status: 'Active' },
                  { name: 'Devon Vance', email: 'd.vance@acmetech.com', role: 'Payments Eng Lead', status: 'Active' },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary-600)] text-white flex items-center justify-center text-xs font-bold">
                        {m.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--text-primary)]">{m.name}</span>
                        <p className="text-[11px] text-[var(--text-muted)]">{m.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{m.role}</Badge>
                      <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="saas-card p-6 space-y-5">
              <div className="pb-3 border-b border-[var(--border-subtle)]">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  API Keys & Enterprise Security
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Manage secret API keys for programmatic telemetry ingestion and exports.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Key size={15} className="text-[var(--primary-500)]" />
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        Production Intelligence API Key
                      </span>
                    </div>
                    <Badge variant="positive">Active</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      defaultValue="riq_live_9837498234798237498234"
                      readOnly
                      className="flex-1 px-3 py-1.5 text-xs saas-input font-mono bg-[var(--bg-input)]"
                    />
                    <button
                      onClick={() => alert('API Key copied to clipboard.')}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border-app)] hover:bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

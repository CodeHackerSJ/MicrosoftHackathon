'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import ThemeToggle from '@/components/ThemeToggle';
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  BarChart3,
  TrendingDown,
  AlertCircle,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAppContext();
  const [email, setEmail] = useState('alex.rivera@acmetech.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both corporate email and password.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      login(email);
      router.push('/dashboard');
    }, 600);
  };

  const handleMicrosoftLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('alex.rivera@microsoft-corp.com');
      router.push('/dashboard');
    }, 700);
  };

  const enterpriseFeatures = [
    {
      icon: Activity,
      title: 'Automated Review Ingestion',
      description:
        'Continuous synchronization and sentiment telemetry across Google Play & App Store endpoints.',
    },
    {
      icon: TrendingDown,
      title: 'Predictive Churn Detection',
      description:
        'Correlate checkout failures and version regressions with user churn risk in real time.',
    },
    {
      icon: Layers,
      title: 'Operationalized Workflows',
      description:
        'Transform high-impact complaints into prioritized Jira and Linear engineering action items.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg-app)] transition-colors">
      {/* Left Column: Product Value & Enterprise Overview */}
      <div className="hidden lg:flex lg:w-1/2 p-12 xl:p-16 flex-col justify-between border-r border-[var(--border-app)] bg-[var(--bg-card-subtle)] relative overflow-hidden">
        {/* Top Branding */}
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--primary-600)] flex items-center justify-center text-white font-bold text-base shadow-sm">
              <span>IQ</span>
            </div>
            <div>
              <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                ReviewIQ
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold ml-2">
                Enterprise
              </span>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Enterprise Review Intelligence & Revenue Analytics
          </p>
        </div>

        {/* Core Value Statement & Feature Blocks */}
        <div className="max-w-lg my-auto py-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--primary-50)] text-[var(--primary-600)] border border-[var(--primary-100)] text-[11px] font-semibold mb-6">
            <Sparkles size={13} />
            <span>AI Review Intelligence Platform</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight mb-4">
            Transform customer feedback into actionable business intelligence.
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
            ReviewIQ synthesizes thousands of store reviews into high-confidence root causes, churn predictions, and engineering priorities.
          </p>

          <div className="space-y-4">
            {enterpriseFeatures.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-3 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--primary-50)] text-[var(--primary-600)] flex items-center justify-center shrink-0 border border-[var(--primary-100)]">
                  <feat.icon size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Micro Telemetry Widget */}
          <div className="mt-8 p-4 rounded-xl border border-[var(--border-app)] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] mb-3">
              <span>Cross-App Portfolio Telemetry</span>
              <span className="text-[11px] text-[var(--success-text)] font-medium">99.98% Accuracy</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
                <div className="text-lg font-bold text-[var(--text-primary)]">4.4 ★</div>
                <div className="text-[10px] text-[var(--text-muted)]">Avg Rating</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
                <div className="text-lg font-bold text-[var(--success-text)]">72%</div>
                <div className="text-[10px] text-[var(--text-muted)]">Positive Sent.</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)]">
                <div className="text-lg font-bold text-[var(--warning-text)]">6.8%</div>
                <div className="text-[10px] text-[var(--text-muted)]">Churn Risk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-6 border-t border-[var(--border-app)] flex items-center gap-6 text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <Shield size={13} className="text-[var(--success-solid)]" />
            <span>SOC 2 Type II Certified</span>
          </div>
          <span>•</span>
          <span>End-to-End Encryption</span>
          <span>•</span>
          <span>ISO 27001 Ready</span>
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 xl:p-16 relative">
        {/* Top Controls (Theme Toggle) */}
        <div className="flex items-center justify-between sm:justify-end mb-8">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary-600)] flex items-center justify-center text-white font-bold text-sm">
              IQ
            </div>
            <span className="text-base font-bold text-[var(--text-primary)]">ReviewIQ</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Login Container */}
        <div className="w-full max-w-md mx-auto my-auto py-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Welcome back
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              Sign in with your enterprise credentials to access review telemetry.
            </p>
          </div>

          {/* Microsoft SSO Button */}
          <button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-xs font-semibold text-[var(--text-primary)] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow active:scale-[0.99]"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M7.5 0H0v7.5h7.5V0z" fill="#F25022" />
              <path d="M16 0H8.5v7.5H16V0z" fill="#7FBA00" />
              <path d="M7.5 8.5H0V16h7.5V8.5z" fill="#00A4EF" />
              <path d="M16 8.5H8.5V16H16V8.5z" fill="#FFB900" />
            </svg>
            <span>Continue with Microsoft Azure AD</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-app)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[var(--bg-app)] text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Or sign in with email
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[var(--danger-bg)] border border-[var(--danger-border)] text-xs text-[var(--danger-text)] flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                Corporate Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs saas-input placeholder:text-[var(--text-tertiary)]"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your corporate email.')}
                  className="text-[11px] text-[var(--primary-600)] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 text-xs saas-input placeholder:text-[var(--text-tertiary)]"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[var(--border-app)] text-[var(--primary-600)] focus:ring-[var(--primary-500)] w-3.5 h-3.5"
                />
                <span className="text-xs text-[var(--text-secondary)]">
                  Remember this workstation
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white text-xs font-semibold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-5 p-3 rounded-lg border border-[var(--border-app)] bg-[var(--bg-card)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)]">Testing the workspace?</span>
            <button
              onClick={() => {
                setEmail('alex.rivera@acmetech.com');
                setPassword('enterprise-demo-2026');
                setIsLoading(true);
                setTimeout(() => {
                  login('alex.rivera@acmetech.com');
                  router.push('/dashboard');
                }, 500);
              }}
              className="text-[var(--primary-600)] hover:underline font-semibold"
            >
              One-Click Demo Access →
            </button>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="text-center text-[11px] text-[var(--text-muted)] pt-6 border-t border-[var(--border-app)]">
          <p>
            ReviewIQ Enterprise Analytics · SOC 2 Type II Compliant ·{' '}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{' '}
            ·{' '}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

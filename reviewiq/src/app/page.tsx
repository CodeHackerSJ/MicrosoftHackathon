'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import {
  Sparkles,
  Brain,
  TrendingUp,
  Shield,
  Users,
  Target,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAppContext();
  const [email, setEmail] = useState('admin@companyx.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect
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
    setIsLoading(true);
    setTimeout(() => {
      login();
      router.push('/dashboard');
    }, 800);
  };

  const features = [
    { icon: Brain, text: 'AI-powered sentiment analysis', desc: 'Deep learning models analyze thousands of reviews instantly' },
    { icon: Target, text: 'Customer pain-point detection', desc: 'Automatically identify recurring issues and their impact' },
    { icon: Users, text: 'Churn risk intelligence', desc: 'Predict which issues drive customers away' },
    { icon: TrendingUp, text: 'Business & marketing insights', desc: 'Turn feedback data into actionable business decisions' },
  ];

  const pipeline = [
    'Raw Reviews',
    'AI Analysis',
    'Sentiment',
    'Themes',
    'Pain Points',
    'Churn Risk',
    'Business Impact',
    'Action Items',
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel – Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Animated BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Top */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-electric-500/20">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ReviewIQ</span>
            </div>
            <p className="text-sm text-slate-500 ml-[52px]">Enterprise Review Intelligence</p>
          </div>

          {/* Middle */}
          <div className="max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              Understand what your customers are{' '}
              <span className="gradient-text">really saying.</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed mb-10">
              Transform thousands of customer reviews into actionable business intelligence. Don't just analyze reviews — understand what they mean for your business.
            </p>

            <div className="space-y-5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-electric-500/10 border border-electric-500/20 flex items-center justify-center shrink-0 group-hover:bg-electric-500/15 transition-colors">
                    <f.icon size={16} className="text-electric-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{f.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Visual */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-3">Intelligence Pipeline</p>
            <div className="flex items-center flex-wrap gap-1">
              {pipeline.map((step, i) => (
                <React.Fragment key={step}>
                  <span className="text-[10px] px-2 py-1 rounded bg-navy-800/80 text-slate-400 border border-white/5">
                    {step}
                  </span>
                  {i < pipeline.length - 1 && (
                    <ArrowRight size={10} className="text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel – Login */}
      <div className="flex-1 flex items-center justify-center p-6 bg-navy-950 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl ai-gradient flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">ReviewIQ</span>
          </div>

          <div className="glass-card rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-slate-100 mb-1">Company Login</h2>
              <p className="text-sm text-slate-500">Enterprise-grade Review Intelligence</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Company Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-800/60 border border-white/5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-electric-500/30 focus:ring-1 focus:ring-electric-500/20 transition-all"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-800/60 border border-white/5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-electric-500/30 focus:ring-1 focus:ring-electric-500/20 transition-all"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-electric-500 hover:bg-electric-400 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-navy-800 text-xs text-slate-500">or</span>
              </div>
            </div>

            <button
              onClick={() => { setIsLoading(true); setTimeout(() => { login(); router.push('/dashboard'); }, 600); }}
              className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/8 border border-white/10 text-sm font-medium text-slate-300 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.5 0H0v7.5h7.5V0z" fill="#F25022"/><path d="M16 0H8.5v7.5H16V0z" fill="#7FBA00"/><path d="M7.5 8.5H0V16h7.5V8.5z" fill="#00A4EF"/><path d="M16 8.5H8.5V16H16V8.5z" fill="#FFB900"/></svg>
              Continue with Microsoft
            </button>

            <div className="mt-6 flex items-center gap-2 justify-center">
              <Shield size={12} className="text-slate-600" />
              <span className="text-[10px] text-slate-600">SOC 2 Compliant · End-to-End Encryption</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

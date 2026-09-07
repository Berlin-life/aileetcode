'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('demo@risingbrain.org')
  const [password, setPassword] = useState('password123')
  const [isLoading, setIsLoading] = useState(false)

  const performLogin = () => {
    setIsLoading(true)
    document.cookie = 'demo_session=true; path=/; max-age=86400'
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 200)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    performLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 p-8 border border-slate-800 bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> CodeMentor AI Platform
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-400">Sign in to continue your DSA pattern mastery</p>
        </div>

        {/* Demo Credentials Alert Banner */}
        <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> Demo Credentials Enabled
          </div>
          <div className="text-xs text-slate-400 space-y-0.5 font-mono">
            <div><span className="text-slate-500">Email:</span> demo@risingbrain.org</div>
            <div><span className="text-slate-500">Password:</span> password123</div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@risingbrain.org"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-xs text-slate-500 uppercase tracking-wider font-semibold">Or</span>
        </div>

        {/* Quick Demo Login Button */}
        <button
          onClick={performLogin}
          type="button"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-all border border-slate-700 flex items-center justify-center gap-2"
        >
          ⚡ Quick Demo Login (Instant Access)
        </button>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-2">
          Don't have an account?{' '}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
            Create one
          </Link>
        </div>
      </div>
    </div>
  )
}

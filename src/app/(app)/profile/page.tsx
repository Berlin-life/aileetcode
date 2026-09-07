'use client'

import * as React from 'react'
import { User, Mail, Shield, Settings, Key, Code2, Save, CheckCircle2, Moon, Sun, Sparkles } from 'lucide-react'
import { useThemeStore } from '@/stores/theme-store'

export default function ProfilePage() {
  const { theme, toggleTheme } = useThemeStore()
  const [name, setName] = React.useState('John Doe')
  const [email, setEmail] = React.useState('john.doe@codementer.ai')
  const [language, setLanguage] = React.useState('python')
  const [mentorStyle, setMentorStyle] = React.useState('socratic')
  const [dailyGoal, setDailyGoal] = React.useState('3')
  const [saved, setSaved] = React.useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences, learning goals, and AI mentor style.</p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0 border-2 border-primary/30">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 font-semibold w-fit mx-auto md:mx-0">
              Pro Member
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{email}</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-3 justify-center md:justify-start">
            <span>🏆 Level 3 (Apprentice)</span>
            <span>🔥 7-Day Streak</span>
            <span>⚡ 24 Problems Solved</span>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Account Details */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-3">
            <User className="h-5 w-5 text-primary" /> Personal Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Full Name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Email Address
              </label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Preferences & AI Mentor Settings */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="h-5 w-5 text-indigo-400" /> Learning & AI Mentor Preferences
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Primary Language
              </label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (ES6)</option>
                <option value="java">Java 17</option>
                <option value="cpp">C++ 20</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                AI Coaching Tone
              </label>
              <select
                value={mentorStyle}
                onChange={e => setMentorStyle(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="socratic">Socratic (Guiding Questions)</option>
                <option value="direct">Direct & Concise</option>
                <option value="detailed">In-Depth Explanations</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Daily Problem Target
              </label>
              <select
                value={dailyGoal}
                onChange={e => setDailyGoal(e.target.value)}
                className="w-full px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="1">1 Problem / day (Casual)</option>
                <option value="3">3 Problems / day (Recommended)</option>
                <option value="5">5 Problems / day (Intensive)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Theme Settings & System Status */}
        <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary">
              {theme === 'dark' ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-400" />}
            </div>
            <div>
              <h4 className="font-semibold text-sm">Interface Theme</h4>
              <p className="text-xs text-muted-foreground">Current theme: <span className="capitalize font-semibold">{theme}</span></p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-4 py-2 bg-secondary border border-border rounded-xl text-xs font-semibold hover:bg-secondary/80 transition-colors"
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="h-4 w-4" /> Preferences saved successfully!
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Changes apply immediately to your session</span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4" /> Save Profile
          </button>
        </div>
      </form>
    </div>
  )
}

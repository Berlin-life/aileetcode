'use client'

import * as React from 'react'
import { 
  BarChart3, TrendingUp, CheckCircle2, Brain, 
  Flame, Target, Calendar, ArrowUp, ArrowDown, Minus 
} from 'lucide-react'

const WEEKLY_ACTIVITY = [
  { day: 'Mon', problems: 3, score: 82 },
  { day: 'Tue', problems: 1, score: 78 },
  { day: 'Wed', problems: 4, score: 88 },
  { day: 'Thu', problems: 2, score: 85 },
  { day: 'Fri', problems: 0, score: 85 },
  { day: 'Sat', problems: 5, score: 90 },
  { day: 'Sun', problems: 2, score: 86 },
]

const TOPIC_STATS = [
  { topic: 'Arrays & Hashing', solved: 4, total: 9, mastery: 72, trend: 'up' },
  { topic: 'Two Pointers', solved: 1, total: 5, mastery: 55, trend: 'up' },
  { topic: 'Sliding Window', solved: 0, total: 6, mastery: 40, trend: 'stable' },
  { topic: 'Linked Lists', solved: 2, total: 11, mastery: 65, trend: 'up' },
  { topic: 'Binary Search', solved: 0, total: 7, mastery: 30, trend: 'stable' },
  { topic: 'Trees', solved: 0, total: 15, mastery: 20, trend: 'down' },
  { topic: 'Dynamic Programming', solved: 1, total: 10, mastery: 18, trend: 'stable' },
  { topic: 'Graphs', solved: 0, total: 13, mastery: 5, trend: 'stable' },
]

const MILESTONES = [
  { label: 'First Problem Solved', achieved: true, date: '2 weeks ago' },
  { label: '10 Problems Solved', achieved: true, date: '1 week ago' },
  { label: '25 Problems Solved', achieved: false, progress: 96 },
  { label: '7-Day Streak', achieved: true, date: 'Today!' },
  { label: '50 Problems Solved', achieved: false, progress: 48 },
  { label: 'Master an Easy Topic', achieved: false, progress: 72 },
]

const MAX_PROBLEMS = Math.max(...WEEKLY_ACTIVITY.map(d => d.problems))

export default function ProgressPage() {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Report</h1>
        <p className="text-muted-foreground mt-1">Track your growth and identify areas for improvement.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Solved', value: '24', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Avg. Understanding', value: '86%', icon: Brain, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: 'Current Streak', value: '7 days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
          { label: 'This Week', value: '+17', icon: TrendingUp, color: 'text-teal-400', bg: 'bg-teal-400/10' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</span>
            </div>
            <div className="text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-5">This Week's Activity</h2>
          <div className="flex items-end gap-2 h-32">
            {WEEKLY_ACTIVITY.map((day) => {
              const height = MAX_PROBLEMS > 0 ? (day.problems / MAX_PROBLEMS) * 100 : 0
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end" style={{ height: '96px' }}>
                    <div 
                      className={`w-full rounded-t-md transition-all duration-700 ${day.problems === 0 ? 'bg-secondary' : 'bg-primary/70 hover:bg-primary'}`}
                      style={{ height: day.problems === 0 ? '4px' : `${height}%` }}
                      title={`${day.problems} problems`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <span className="text-xs font-medium">{day.problems}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm text-muted-foreground">
            <span>Total: <span className="font-semibold text-foreground">17 problems</span></span>
            <span>Best day: <span className="font-semibold text-foreground">Sat (5)</span></span>
          </div>
        </div>

        {/* Milestones */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-400" />
            Milestones
          </h2>
          <div className="space-y-3">
            {MILESTONES.map((m) => (
              <div key={m.label} className={`flex items-center justify-between p-3 rounded-lg ${m.achieved ? 'bg-emerald-400/5 border border-emerald-400/20' : 'bg-secondary/30'}`}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${m.achieved ? 'text-emerald-400' : 'text-muted-foreground/30'}`} />
                  <span className={`text-sm font-medium ${m.achieved ? '' : 'text-muted-foreground'}`}>{m.label}</span>
                </div>
                <div className="text-right">
                  {m.achieved 
                    ? <span className="text-xs text-muted-foreground">{m.date}</span>
                    : <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary/60 rounded-full" style={{ width: `${m.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{m.progress}%</span>
                      </div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-5">Topic Breakdown</h2>
        <div className="space-y-3">
          {TOPIC_STATS.map((t) => (
            <div key={t.topic} className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-3 text-sm font-medium truncate">{t.topic}</div>
              <div className="col-span-1 text-xs text-muted-foreground text-center">{t.solved}/{t.total}</div>
              <div className="col-span-6">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      t.mastery >= 70 ? 'bg-emerald-500' : 
                      t.mastery >= 40 ? 'bg-amber-500' : 
                      'bg-rose-500/60'
                    }`}
                    style={{ width: `${t.mastery}%` }}
                  />
                </div>
              </div>
              <div className="col-span-1 text-xs text-muted-foreground text-right">{t.mastery}%</div>
              <div className="col-span-1 flex justify-center">
                {t.trend === 'up' && <ArrowUp className="h-3.5 w-3.5 text-emerald-400" />}
                {t.trend === 'down' && <ArrowDown className="h-3.5 w-3.5 text-rose-400" />}
                {t.trend === 'stable' && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

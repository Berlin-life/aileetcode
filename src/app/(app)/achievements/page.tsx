'use client'

import * as React from 'react'
import { 
  Trophy, Lock, Star, Flame, Zap, Brain, 
  CheckCircle2, Code2, Target, Award 
} from 'lucide-react'

const ACHIEVEMENTS = [
  {
    id: 'first-solve',
    title: 'First Blood',
    description: 'Solve your first problem',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    unlocked: true,
    date: '2 weeks ago',
    xp: 50,
  },
  {
    id: 'hot-streak',
    title: 'On Fire',
    description: 'Maintain a 7-day solving streak',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    unlocked: true,
    date: 'Today',
    xp: 100,
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Solve a problem in under 10 minutes',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    unlocked: true,
    date: '5 days ago',
    xp: 75,
  },
  {
    id: 'deep-thinker',
    title: 'Deep Thinker',
    description: 'Score 90%+ on the Understanding Gate',
    icon: Brain,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/30',
    unlocked: false,
    progress: 86,
    xp: 150,
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Submit a solution with 0 wrong attempts',
    icon: Star,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    unlocked: false,
    progress: 60,
    xp: 200,
  },
  {
    id: 'pattern-master',
    title: 'Pattern Master',
    description: 'Master all problems in any one pattern',
    icon: Target,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/30',
    unlocked: false,
    progress: 44,
    xp: 300,
  },
  {
    id: 'century',
    title: 'Centurion',
    description: 'Solve 100 problems',
    icon: Trophy,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    unlocked: false,
    progress: 24,
    xp: 500,
  },
  {
    id: 'no-hints',
    title: 'No Training Wheels',
    description: 'Solve 5 problems in a row without hints',
    icon: Code2,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/30',
    unlocked: false,
    progress: 40,
    xp: 250,
  },
]

export default function AchievementsPage() {
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked)
  const locked = ACHIEVEMENTS.filter(a => !a.unlocked)
  const totalXP = unlocked.reduce((sum, a) => sum + a.xp, 0)

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground mt-1">
            {unlocked.length} / {ACHIEVEMENTS.length} unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-amber-400">{totalXP} XP</div>
          <div className="text-xs text-muted-foreground">Total earned</div>
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-5">
        <div className="flex items-center gap-3 mb-3">
          <Award className="h-5 w-5 text-amber-400" />
          <div>
            <span className="font-bold">Level 3</span>
            <span className="text-muted-foreground text-sm ml-2">Apprentice Coder</span>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{totalXP} / 500 XP to Level 4</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.min((totalXP / 500) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" /> Unlocked
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unlocked.map((a) => (
            <div key={a.id} className={`rounded-xl border ${a.border} ${a.bg} p-5 hover:scale-[1.02] transition-transform`}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <a.icon className={`h-6 w-6 ${a.color}`} />
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 font-medium">+{a.xp} XP</span>
              </div>
              <h3 className="font-bold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{a.description}</p>
              <p className="text-xs text-muted-foreground">Earned {a.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">In Progress</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locked.map((a) => (
            <div key={a.id} className="rounded-xl border border-border bg-card/50 p-5 opacity-80">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-secondary">
                  <a.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary font-medium text-muted-foreground">+{a.xp} XP</span>
              </div>
              <h3 className="font-bold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{a.description}</p>
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>Progress</span>
                  <span>{a.progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full">
                  <div className="h-full bg-primary/50 rounded-full" style={{ width: `${a.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

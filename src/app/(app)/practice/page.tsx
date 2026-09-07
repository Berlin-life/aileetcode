'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Target, Clock, Zap, ChevronRight, Trophy, 
  Shuffle, BarChart3, BookOpen
} from 'lucide-react'

const PRACTICE_MODES = [
  {
    id: 'topic',
    title: 'Topic Practice',
    description: 'Deep-dive into a specific topic like Trees, DP, or Graphs.',
    icon: BookOpen,
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30',
    iconColor: 'text-indigo-400',
    href: '/problems',
    cta: 'Choose Topic',
  },
  {
    id: 'timed',
    title: 'Timed Challenge',
    description: 'Simulate interview pressure. Solve problems with a countdown timer.',
    icon: Clock,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    iconColor: 'text-amber-400',
    href: '/practice/timed',
    cta: 'Start Timer',
  },
  {
    id: 'random',
    title: 'Random Problem',
    description: 'Test your versatility. Get a random problem from your weak areas.',
    icon: Shuffle,
    color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30',
    iconColor: 'text-teal-400',
    href: '/problems/two-sum',
    cta: 'Pick Random',
  },
  {
    id: 'pattern',
    title: 'Pattern Drill',
    description: 'Focus on mastering one algorithmic pattern at a time.',
    icon: Target,
    color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
    iconColor: 'text-rose-400',
    href: '/practice/patterns',
    cta: 'Pick Pattern',
  },
]

const PATTERNS = [
  { name: 'Sliding Window', count: 6, mastery: 40 },
  { name: 'Two Pointers', count: 5, mastery: 55 },
  { name: 'Fast & Slow Pointers', count: 4, mastery: 20 },
  { name: 'Merge Intervals', count: 6, mastery: 10 },
  { name: 'Top K Elements', count: 5, mastery: 0 },
  { name: 'Modified Binary Search', count: 7, mastery: 30 },
  { name: 'Tree BFS', count: 9, mastery: 15 },
  { name: 'Tree DFS', count: 8, mastery: 25 },
  { name: '0/1 Knapsack (DP)', count: 6, mastery: 0 },
]

export default function PracticePage() {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
        <p className="text-muted-foreground mt-1">Choose a practice mode to sharpen your skills.</p>
      </div>

      {/* Practice Modes */}
      <div className="grid gap-4 sm:grid-cols-2">
        {PRACTICE_MODES.map((mode) => (
          <Link
            key={mode.id}
            href={mode.href}
            className={`group rounded-xl border bg-gradient-to-br ${mode.color} p-6 hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-lg bg-white/5 ${mode.iconColor}`}>
                <mode.icon className="h-5 w-5" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">{mode.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
            <span className={`text-sm font-semibold ${mode.iconColor} flex items-center gap-1`}>
              {mode.cta} <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Pattern Mastery */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Pattern Mastery</h2>
          <span className="text-sm text-muted-foreground">{PATTERNS.filter(p => p.mastery > 0).length}/{PATTERNS.length} started</span>
        </div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {PATTERNS.map((pattern) => (
            <div key={pattern.name} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-sm">{pattern.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{pattern.count} problems</span>
                    <span className={`text-xs font-semibold ${pattern.mastery >= 70 ? 'text-emerald-400' : pattern.mastery >= 40 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                      {pattern.mastery}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      pattern.mastery >= 70 ? 'bg-emerald-500' : 
                      pattern.mastery >= 40 ? 'bg-amber-500' : 
                      pattern.mastery > 0 ? 'bg-primary' : 'bg-secondary'
                    }`}
                    style={{ width: `${pattern.mastery}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

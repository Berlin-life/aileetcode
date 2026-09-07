'use client'

import * as React from 'react'
import Link from 'next/link'
import { Target, ChevronLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

const PATTERN_DRILLS = [
  {
    name: 'Sliding Window',
    description: 'Master fixed and dynamic window techniques for subarray problems.',
    difficulty: 'Medium',
    problemCount: 6,
    recommendedProblem: 'best-time-to-buy-and-sell-stock'
  },
  {
    name: 'Two Pointers',
    description: 'Converging or parallel pointers for sorted array searches.',
    difficulty: 'Easy to Medium',
    problemCount: 5,
    recommendedProblem: 'container-with-most-water'
  },
  {
    name: 'Fast & Slow Pointers',
    description: 'Cycle detection algorithms in linked lists and arrays.',
    difficulty: 'Easy',
    problemCount: 4,
    recommendedProblem: 'climbing-stairs'
  },
  {
    name: 'Merge Intervals',
    description: 'Overlap detection and interval fusion techniques.',
    difficulty: 'Medium',
    problemCount: 6,
    recommendedProblem: 'two-sum'
  },
  {
    name: 'Modified Binary Search',
    description: 'Logarithmic search on rotated or custom monotonic spaces.',
    difficulty: 'Medium',
    problemCount: 7,
    recommendedProblem: 'two-sum'
  }
]

export default function PatternDrillPage() {
  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      <Link href="/practice" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Practice
      </Link>

      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-card to-card p-6 md:p-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Pattern Drill Practice</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Select a core algorithmic pattern to drill related problems sequentially.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PATTERN_DRILLS.map((drill) => (
          <div
            key={drill.name}
            className="rounded-xl border border-border bg-card p-5 space-y-3 hover:border-primary/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{drill.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-semibold">
                  {drill.problemCount} problems
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{drill.description}</p>
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Difficulty: {drill.difficulty}</span>
              <Link
                href={`/problems/${drill.recommendedProblem}`}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                Start Drill <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

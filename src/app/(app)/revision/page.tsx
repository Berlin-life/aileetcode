'use client'

import * as React from 'react'
import Link from 'next/link'
import { Calendar, CheckCircle2, Clock, ArrowRight, Brain, Zap } from 'lucide-react'

const INTERVALS = [
  { label: '1 day', color: 'text-rose-400 bg-rose-400/10' },
  { label: '3 days', color: 'text-amber-400 bg-amber-400/10' },
  { label: '7 days', color: 'text-blue-400 bg-blue-400/10' },
  { label: '14 days', color: 'text-indigo-400 bg-indigo-400/10' },
  { label: '30 days', color: 'text-emerald-400 bg-emerald-400/10' },
]

const DUE_TODAY = [
  { slug: 'two-sum', title: 'Two Sum', difficulty: 'easy', lastSolved: '6 days ago', interval: '7 days' },
  { slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy', lastSolved: '13 days ago', interval: '14 days' },
  { slug: 'maximum-subarray', title: 'Maximum Subarray', difficulty: 'medium', lastSolved: '29 days ago', interval: '30 days' },
]

const UPCOMING = [
  { slug: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'easy', dueIn: 2 },
  { slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'easy', dueIn: 4 },
  { slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'medium', dueIn: 7 },
  { slug: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'medium', dueIn: 9 },
]

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  hard: 'text-rose-400 bg-rose-400/10',
}

export default function RevisionPage() {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Spaced Repetition</h1>
        <p className="text-muted-foreground mt-1">
          Revisit problems at optimal intervals to move them into long-term memory.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-indigo-400" />
          <span className="font-semibold text-indigo-400">How Spaced Repetition Works</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          After you solve a problem, it gets scheduled for review at increasing intervals. Each time you successfully recall the solution, the interval grows.
        </p>
        <div className="flex flex-wrap gap-2">
          {INTERVALS.map((interval, i) => (
            <div key={interval.label} className="flex items-center gap-1.5">
              {i > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${interval.color}`}>
                {interval.label}
              </span>
            </div>
          ))}
          <ArrowRight className="h-3 w-3 text-muted-foreground self-center" />
          <span className="text-xs text-muted-foreground self-center">60 days → ∞</span>
        </div>
      </div>

      {/* Due Today */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Due Today</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-400/10 text-rose-400 font-semibold">
              {DUE_TODAY.length} problems
            </span>
          </div>
          {DUE_TODAY.length > 0 && (
            <Link href="/problems/two-sum" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
              Review All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        {DUE_TODAY.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-12 text-center text-muted-foreground">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
            <p className="font-medium">All caught up!</p>
            <p className="text-sm mt-1">No reviews due today.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {DUE_TODAY.map((p) => (
              <div key={p.slug} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-rose-400/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-rose-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{p.title}</p>
                    <p className="text-xs text-muted-foreground">Last solved {p.lastSolved} · Interval: {p.interval}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                  <Link 
                    href={`/problems/${p.slug}`}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Reviews</h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {UPCOMING.map((p) => (
            <div key={p.slug} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="font-medium text-sm">{p.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[p.difficulty]}`}>
                  {p.difficulty}
                </span>
                <span className="text-xs text-muted-foreground">in {p.dueIn} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

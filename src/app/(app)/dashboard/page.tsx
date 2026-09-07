'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Flame, Trophy, Brain, Code2, ArrowRight, 
  Zap, BookOpen, BarChart2, CheckCircle2, Clock
} from 'lucide-react'

const STATS = [
  { label: 'Problems Solved', value: '24', delta: '+3 this week', icon: CheckCircle2, color: 'text-emerald-400' },
  { label: 'Understanding Score', value: '86%', delta: '+4% this week', icon: Brain, color: 'text-indigo-400' },
  { label: 'Hint Dependency', value: '18%', delta: '-6% improved', icon: Zap, color: 'text-amber-400' },
  { label: 'Day Streak', value: '7', delta: 'Keep it up! 🔥', icon: Flame, color: 'text-orange-400' },
]

const RECENT_PROBLEMS = [
  { slug: 'two-sum', title: 'Two Sum', difficulty: 'easy', status: 'solved', time: '2h ago' },
  { slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy', status: 'solved', time: '1d ago' },
  { slug: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', difficulty: 'easy', status: 'in-progress', time: '2d ago' },
  { slug: 'maximum-subarray', title: 'Maximum Subarray', difficulty: 'medium', status: 'solved', time: '3d ago' },
]

const RECOMMENDED = [
  { slug: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', pattern: 'Sliding Window' },
  { slug: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'easy', pattern: 'Hash Map' },
  { slug: 'product-of-array-except-self', title: 'Product of Array Except Self', difficulty: 'medium', pattern: 'Prefix Sum' },
]

const SKILLS = [
  { name: 'Arrays & Hashing', score: 72 },
  { name: 'Two Pointers', score: 55 },
  { name: 'Sliding Window', score: 40 },
  { name: 'Binary Search', score: 30 },
  { name: 'Linked Lists', score: 65 },
  { name: 'Trees', score: 20 },
]

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-amber-400 bg-amber-400/10',
  hard: 'text-rose-400 bg-rose-400/10',
}

export default function DashboardPage() {
  const [greeting, setGreeting] = React.useState('Good day')
  
  React.useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">👋 {greeting}</p>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
            Ready to solve today?
          </h1>
          <p className="text-muted-foreground mt-2">
            You're on a <span className="text-orange-400 font-semibold">7-day streak</span> — keep going!
          </p>
        </div>
        <Link 
          href="/problems"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105"
        >
          <Code2 className="h-4 w-4" />
          Start Solving
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Problems */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Recent Problems</h2>
            <Link href="/problems" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-2">
            {RECENT_PROBLEMS.map((p) => (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {p.status === 'solved' 
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    : <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  }
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">{p.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-indigo-500/5 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400">Daily Challenge</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Climbing Stairs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A classic dynamic programming problem. Can you find the pattern?
            </p>
            <span className="inline-block text-xs px-2 py-0.5 rounded-full font-medium text-emerald-400 bg-emerald-400/10 mb-6">
              easy
            </span>
            <Link 
              href="/problems/climbing-stairs"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Challenge <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Skill Progress */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Skill Progress</h2>
            <Link href="/progress" className="text-sm text-primary hover:underline flex items-center gap-1">
              Full report <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {SKILLS.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.score}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-primary transition-all duration-700"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-semibold">Recommended Next</h2>
          </div>
          <div className="space-y-3">
            {RECOMMENDED.map((p) => (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                className="flex flex-col p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all group"
              >
                <span className="font-medium text-sm group-hover:text-primary transition-colors mb-1">{p.title}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${DIFFICULTY_COLOR[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.pattern}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/problems" className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:underline">
            See all problems <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

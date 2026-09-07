'use client'

import * as React from 'react'
import Link from 'next/link'
import { Search, CheckCircle2, Circle, Sparkles } from 'lucide-react'
import { RISING_BRAIN_TOPICS, slugify } from '@/lib/problems-data'

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10 border border-emerald-500/20',
  medium: 'text-amber-400 bg-amber-400/10 border border-amber-500/20',
  hard: 'text-rose-400 bg-rose-400/10 border border-rose-500/20',
}

const TOPICS = [
  'All', 'Arrays', 'Strings', 'Binary Search', 'Stack', 
  'Recursion & Backtracking', 'Graphs', 'Dynamic Programming'
]

export default function ProblemsPage() {
  const [search, setSearch] = React.useState('')
  const [difficulty, setDifficulty] = React.useState('All')
  const [topic, setTopic] = React.useState('All')

  // Extract all problems cleanly from RISING_BRAIN_TOPICS
  const problems = React.useMemo(() => {
    const map = new Map<string, any>()
    RISING_BRAIN_TOPICS.forEach(t => {
      t.patterns.forEach(p => {
        p.problems.forEach(prob => {
          const slug = slugify(prob.title)
          if (!map.has(slug)) {
            map.set(slug, {
              slug,
              title: prob.title,
              difficulty: prob.difficulty,
              topics: [t.name],
              pattern: p.name,
              solved: ['two-sum', 'valid-parentheses', 'best-time-to-buy-and-sell-stock', 'maximum-subarray'].includes(slug)
            })
          }
        })
      })
    })
    return Array.from(map.values())
  }, [])

  const filtered = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.pattern.toLowerCase().includes(search.toLowerCase())
    const matchDiff = difficulty === 'All' || p.difficulty === difficulty
    const matchTopic = topic === 'All' || p.topics.includes(topic)
    return matchSearch && matchDiff && matchTopic
  })

  const solved = problems.filter(p => p.solved).length

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Library</h1>
          <p className="text-muted-foreground mt-1">
            {solved} / {problems.length} problems solved
          </p>
        </div>

        <Link
          href="/sheet"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/20 transition-colors text-sm"
        >
          <Sparkles className="h-4 w-4" /> Open RisingBrain Pattern Sheet
        </Link>
      </div>

      {/* Difficulty Counts Bar */}
      <div className="flex gap-4 text-xs font-semibold">
        <span className="text-emerald-400">Easy: {problems.filter(p => p.difficulty === 'easy').length}</span>
        <span className="text-amber-400">Medium: {problems.filter(p => p.difficulty === 'medium').length}</span>
        <span className="text-rose-400">Hard: {problems.filter(p => p.difficulty === 'hard').length}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems by name or pattern..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="All">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {TOPICS.map(t => <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>)}
        </select>
      </div>

      {/* Problems Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Title & Pattern</div>
          <div className="col-span-3">Topic</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-1 text-center">Status</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              No problems match your search filters.
            </div>
          ) : (
            filtered.map((problem, index) => (
              <Link
                key={problem.slug}
                href={`/problems/${problem.slug}`}
                className="grid grid-cols-12 px-4 py-3.5 hover:bg-secondary/30 transition-colors group items-center"
              >
                <div className="col-span-1 text-sm text-muted-foreground font-mono">{index + 1}</div>
                <div className="col-span-5 font-medium text-sm group-hover:text-primary transition-colors">
                  <div>{problem.title}</div>
                  <span className="text-xs text-muted-foreground">{problem.pattern}</span>
                </div>
                <div className="col-span-3 flex flex-wrap gap-1">
                  {problem.topics.map((t: string) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="col-span-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${DIFFICULTY_COLOR[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col-span-1 flex justify-center">
                  {problem.solved 
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    : <Circle className="h-4 w-4 text-muted-foreground/40" />
                  }
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

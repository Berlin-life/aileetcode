'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Sparkles, Search, ChevronRight, ChevronDown, CheckCircle2, 
  Circle, Play, Layers, Zap, ArrowRight, BookOpen, Target 
} from 'lucide-react'
import { RISING_BRAIN_TOPICS, slugify } from '@/lib/problems-data'

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-500/20',
  hard: 'text-rose-400 bg-rose-400/10 border-rose-500/20',
}

export default function RisingBrainSheetPage() {
  const [viewMode, setViewMode] = React.useState<'pattern' | 'lastMinute'>('pattern')
  const [search, setSearch] = React.useState('')
  const [difficulty, setDifficulty] = React.useState('All')
  const [selectedTopic, setSelectedTopic] = React.useState('All')
  const [expandedPatterns, setExpandedPatterns] = React.useState<string[]>([])
  const [solvedMap, setSolvedMap] = React.useState<Record<string, boolean>>({})

  // Expand all patterns by default on initial render
  React.useEffect(() => {
    const allPatternKeys = RISING_BRAIN_TOPICS.flatMap(t => t.patterns.map(p => `${t.name}-${p.name}`))
    setExpandedPatterns(allPatternKeys)
  }, [])

  const togglePattern = (key: string) => {
    setExpandedPatterns(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key])
  }

  const toggleSolved = (slug: string) => {
    setSolvedMap(prev => ({ ...prev, [slug]: !prev[slug] }))
  }

  // All problems extracted for Last Minute 100 view or metrics
  const allProblemsFlat = React.useMemo(() => {
    return RISING_BRAIN_TOPICS.flatMap(t => 
      t.patterns.flatMap(p => 
        p.problems.map(prob => ({
          ...prob,
          slug: slugify(prob.title),
          topic: t.name,
          pattern: p.name
        }))
      )
    )
  }, [])

  const solvedCount = allProblemsFlat.filter(p => solvedMap[p.slug]).length
  const totalCount = allProblemsFlat.length
  const progressPct = Math.round((solvedCount / totalCount) * 100) || 0

  const filteredTopics = RISING_BRAIN_TOPICS.map(topic => {
    if (selectedTopic !== 'All' && topic.name !== selectedTopic) return null

    const matchingPatterns = topic.patterns.map(pattern => {
      const matchingProblems = pattern.problems.filter(prob => {
        const matchSearch = prob.title.toLowerCase().includes(search.toLowerCase()) || 
                            pattern.name.toLowerCase().includes(search.toLowerCase()) ||
                            topic.name.toLowerCase().includes(search.toLowerCase())
        const matchDiff = difficulty === 'All' || prob.difficulty === difficulty
        return matchSearch && matchDiff
      })

      return {
        ...pattern,
        problems: matchingProblems
      }
    }).filter(p => p.problems.length > 0)

    if (matchingPatterns.length === 0) return null

    return {
      ...topic,
      patterns: matchingPatterns
    }
  }).filter(Boolean) as typeof RISING_BRAIN_TOPICS

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-card to-card p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">RisingBrain Sheet for DSA Mastery</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Pattern-wise curriculum covering Arrays, Strings, Binary Search, Stack, Graphs, and DP.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-secondary/50 p-2.5 rounded-xl border border-border">
            <div className="text-right px-2">
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Overall Solved</div>
              <div className="text-xl font-bold text-emerald-400">{solvedCount} / {totalCount}</div>
            </div>
            <div className="w-16 h-16 relative flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-muted/30" fill="transparent" />
                <circle 
                  cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" 
                  className="text-emerald-400 transition-all duration-700" 
                  fill="transparent"
                  strokeDasharray={138}
                  strokeDashoffset={138 - (138 * progressPct) / 100}
                />
              </svg>
              <span className="absolute text-xs font-bold">{progressPct}%</span>
            </div>
          </div>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setViewMode('pattern')}
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
              viewMode === 'pattern' 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20' 
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <Layers className="h-4 w-4" /> Pattern-Wise Sheet ({totalCount} Problems)
          </button>
          <button
            onClick={() => setViewMode('lastMinute')}
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
              viewMode === 'lastMinute' 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20' 
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <Zap className="h-4 w-4 fill-current" /> Last Minute 100 Revision
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search title, pattern, or algorithm..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        <select
          value={selectedTopic}
          onChange={e => setSelectedTopic(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="All">All Topics</option>
          {RISING_BRAIN_TOPICS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
        </select>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        >
          <option value="All">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Main Content Area */}
      {viewMode === 'pattern' ? (
        /* Pattern-Wise Sheet View */
        <div className="space-y-8">
          {filteredTopics.map((topic) => (
            <div key={topic.name} className="space-y-4">
              <div className="border-b border-border pb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{topic.name}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{topic.description}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-semibold">
                  {topic.patterns.reduce((sum, p) => sum + p.problems.length, 0)} problems
                </span>
              </div>

              <div className="space-y-3">
                {topic.patterns.map((pattern) => {
                  const patternKey = `${topic.name}-${pattern.name}`
                  const isOpen = expandedPatterns.includes(patternKey)
                  const patternSolved = pattern.problems.filter(p => solvedMap[slugify(p.title)]).length
                  const patternPct = Math.round((patternSolved / pattern.problems.length) * 100) || 0

                  return (
                    <div key={pattern.name} className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-emerald-500/30">
                      <button
                        onClick={() => togglePattern(patternKey)}
                        className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          {isOpen ? <ChevronDown className="h-4 w-4 text-emerald-400" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          <div>
                            <h3 className="font-bold text-base flex items-center gap-2">
                              {pattern.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{pattern.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono font-semibold text-muted-foreground">
                            {patternSolved} / {pattern.problems.length}
                          </span>
                          <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${patternPct}%` }} />
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-border divide-y divide-border bg-secondary/10">
                          {pattern.problems.map((prob) => {
                            const slug = slugify(prob.title)
                            const isSolved = Boolean(solvedMap[slug])

                            return (
                              <div key={prob.title} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/40 transition-colors group">
                                <div className="flex items-center gap-3">
                                  <button onClick={() => toggleSolved(slug)}>
                                    {isSolved ? (
                                      <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20 cursor-pointer" />
                                    ) : (
                                      <Circle className="h-5 w-5 text-muted-foreground/40 hover:text-emerald-400 cursor-pointer" />
                                    )}
                                  </button>
                                  <Link href={`/problems/${slug}`} className="font-medium text-sm hover:text-emerald-400 transition-colors">
                                    {prob.title}
                                  </Link>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${DIFFICULTY_COLOR[prob.difficulty]}`}>
                                    {prob.difficulty}
                                  </span>
                                  <Link
                                    href={`/problems/${slug}`}
                                    className="px-3 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                                  >
                                    Solve <Play className="h-3 w-3 fill-current" />
                                  </Link>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Last Minute 100 Revision View */
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 flex items-center gap-2">
            <Zap className="h-4 w-4 fill-current flex-shrink-0" />
            <span>High-Yield Interview Revision: Essential problems to revise before your technical interview round.</span>
          </div>

          <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
            {allProblemsFlat.filter(p => {
              const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.pattern.toLowerCase().includes(search.toLowerCase())
              const matchDiff = difficulty === 'All' || p.difficulty === difficulty
              const matchTopic = selectedTopic === 'All' || p.topic === selectedTopic
              return matchSearch && matchDiff && matchTopic
            }).map((p, idx) => (
              <div key={p.title} className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/40 transition-colors group">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-6">#{idx + 1}</span>
                  <button onClick={() => toggleSolved(p.slug)}>
                    {solvedMap[p.slug] ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20 cursor-pointer" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40 hover:text-emerald-400 cursor-pointer" />
                    )}
                  </button>
                  <div>
                    <Link href={`/problems/${p.slug}`} className="font-medium text-sm hover:text-emerald-400 transition-colors">
                      {p.title}
                    </Link>
                    <span className="text-xs text-muted-foreground block">{p.topic} • {p.pattern}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${DIFFICULTY_COLOR[p.difficulty]}`}>
                    {p.difficulty}
                  </span>
                  <Link
                    href={`/problems/${p.slug}`}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                  >
                    Revise <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

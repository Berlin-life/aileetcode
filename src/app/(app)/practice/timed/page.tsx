'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, Play, Zap, Trophy, ShieldAlert, ArrowLeft } from 'lucide-react'

export default function TimedPracticePage() {
  const [seconds, setSeconds] = React.useState(1800) // 30 mins
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    let interval: any = null
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000)
    } else if (seconds === 0) {
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-3xl mx-auto">
      <Link href="/practice" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Practice Modes
      </Link>

      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card p-6 md:p-8 text-center space-y-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
          <Clock className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timed Interview Challenge</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
            Simulate actual coding assessment constraints. Solve the problem before the timer runs out!
          </p>
        </div>

        {/* Big Digital Timer Display */}
        <div className="text-5xl md:text-6xl font-mono font-bold tracking-wider text-amber-400 py-4 bg-background/60 rounded-xl border border-amber-500/20 max-w-xs mx-auto">
          {timeFormatted}
        </div>

        <div className="flex justify-center gap-4">
          {!isActive ? (
            <button
              onClick={() => setIsActive(true)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Play className="h-5 w-5 fill-current" /> Start 30-Min Drill
            </button>
          ) : (
            <Link
              href="/problems/two-sum"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Zap className="h-5 w-5 fill-current" /> Enter Problem Workspace
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

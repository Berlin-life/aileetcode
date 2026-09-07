'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Button } from '@/components/ui/button'
import { HelpCircle, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react'
import { ProgressBar } from '@/components/common/progress-bar'

export function HintSystem() {
  const { problem, hints, addHint } = useProblemStore()
  const [loading, setLoading] = React.useState(false)

  if (!problem) return null

  const handleUnlockHint = async () => {
    setLoading(true)
    try {
      const nextLevel = hints.length + 1
      const res = await fetch('/api/hints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: problem.id, level: nextLevel })
      })
      const data = await res.json()
      addHint(data.hint)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Calculate hint dependency for this problem (e.g. 20% per hint unlocked up to 5 levels)
  const currentDependency = Math.min(hints.length * 20, 100)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-5 w-5 text-teal-400" />
          <span className="font-semibold text-sm text-slate-200">Progressive Hint System</span>
        </div>
        <span className="text-xs text-slate-500 font-medium">Level {hints.length} / 5</span>
      </div>

      {hints.length === 0 ? (
        <div className="text-center py-6 text-slate-400">
          <ShieldCheck className="h-8 w-8 text-emerald-500/80 mx-auto mb-2" />
          <p className="text-sm font-medium">No hints unlocked yet.</p>
          <p className="text-xs text-slate-500 mt-1">Try to solve it independently. Unlock hints progressively if you get stuck.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {hints.map((hint, index) => (
            <div key={index} className="bg-slate-950 border border-slate-850 rounded p-3 text-xs leading-relaxed text-slate-300">
              <div className="font-bold text-teal-500 mb-1">Level {index + 1} Hint:</div>
              <p>{hint}</p>
            </div>
          ))}
        </div>
      )}

      {hints.length < 5 && (
        <div className="pt-2">
          {hints.length === 4 && (
            <div className="flex items-start space-x-2 bg-amber-950/20 border border-amber-900/50 text-amber-400 p-2.5 rounded text-xs mb-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Unlocking the next level will reveal the full conceptual solution code/pseudocode.</span>
            </div>
          )}
          <Button
            onClick={handleUnlockHint}
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 border-none font-bold text-xs"
          >
            {loading ? 'Unlocking...' : `Unlock Level ${hints.length + 1} Hint`}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Hint Dependency Analysis */}
      <div className="border-t border-slate-800 pt-3">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Problem Hint Dependency</span>
          <span className="font-bold text-amber-400">{currentDependency}%</span>
        </div>
        <ProgressBar value={currentDependency} indicatorClassName="bg-amber-500" />
      </div>
    </div>
  )
}

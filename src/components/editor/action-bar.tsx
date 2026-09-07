'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Button } from '@/components/ui/button'
import { Play, Send, RefreshCw } from 'lucide-react'

export function ActionBar() {
  const { 
    problem, 
    code, 
    language, 
    isRunning, 
    isSubmitting,
    setIsRunning, 
    setIsSubmitting, 
    setTestResults,
    setPhase
  } = useProblemStore()

  const handleRun = async () => {
    if (!problem || isRunning || isSubmitting) return
    setIsRunning(true)
    setTestResults(null)

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: problem.id, code, language })
      })
      const data = await res.json()
      setTestResults(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!problem || isRunning || isSubmitting) return
    setIsSubmitting(true)
    setTestResults(null)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId: problem.id, code, language })
      })
      const data = await res.json()
      setTestResults(data)
      // Transition to review phase after submit finishes
      setPhase('review')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800 bg-slate-900 flex-none rounded-b-lg">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            if (confirm("Are you sure you want to reset your code to the default template?")) {
              useProblemStore.getState().setCode('')
            }
          }}
          disabled={isRunning || isSubmitting}
          className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-slate-100"
        >
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Reset
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRun}
          disabled={isRunning || isSubmitting}
          className="bg-slate-800 hover:bg-slate-700 text-slate-100 border-none"
        >
          <Play className={`h-4 w-4 mr-1.5 ${isRunning ? 'animate-spin' : ''}`} />
          Run Code
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleSubmit}
          disabled={isRunning || isSubmitting}
          className="bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold border-none"
        >
          <Send className={`h-4 w-4 mr-1.5 ${isSubmitting ? 'animate-spin' : ''}`} />
          Submit
        </Button>
      </div>
    </div>
  )
}

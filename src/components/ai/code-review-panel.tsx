'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProgressBar } from '@/components/common/progress-bar'
import { Award, Info, RefreshCw } from 'lucide-react'

export function CodeReviewPanel() {
  const { problem, testResults, setPhase } = useProblemStore()
  const [review, setReview] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function getReview() {
      if (!problem || !testResults) return
      setLoading(true)
      try {
        const res = await fetch('/api/code-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            problemId: problem.id, 
            code: useProblemStore.getState().code, 
            language: useProblemStore.getState().language 
          })
        })
        const data = await res.json()
        setReview(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getReview()
  }, [problem, testResults])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
        <RefreshCw className="h-6 w-6 animate-spin text-teal-500 mb-2" />
        <span className="text-xs font-semibold">Generating AI code review...</span>
      </div>
    )
  }

  if (!review) return null

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
      <CardHeader className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <Award className="h-6 w-6 text-teal-500" />
          <CardTitle className="text-lg font-bold">AI Code Review</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Correctness</span>
              <span className="font-bold text-teal-400">{review.correctness * 10}%</span>
            </div>
            <ProgressBar value={review.correctness * 10} indicatorClassName="bg-teal-500" />
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Readability</span>
              <span className="font-bold text-teal-400">{review.readability * 10}%</span>
            </div>
            <ProgressBar value={review.readability * 10} indicatorClassName="bg-teal-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Info className="h-4 w-4 text-teal-500" />
            Complexity Analysis
          </h4>
          <div className="bg-slate-950 border border-slate-850 rounded p-3 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Time Complexity:</span>
              <span className="font-mono text-teal-400 font-bold">{review.timeComplexity.actual}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Space Complexity:</span>
              <span className="font-mono text-teal-400 font-bold">{review.spaceComplexity.actual}</span>
            </div>
            <p className="text-slate-400 mt-2 leading-relaxed">{review.timeComplexity.analysis}</p>
          </div>
        </div>

        {review.improvements && review.improvements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Improvements</h4>
            <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
              {review.improvements.map((imp: string, index: number) => (
                <li key={index} className="leading-relaxed">{imp}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2">
          <p className="text-xs text-slate-400 leading-relaxed italic">{review.overallFeedback}</p>
        </div>
      </CardContent>
    </Card>
  )
}

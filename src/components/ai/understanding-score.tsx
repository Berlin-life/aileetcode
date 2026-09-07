'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { ProgressBar } from '@/components/common/progress-bar'

export function UnderstandingScore() {
  const { understandingSession, setPhase } = useProblemStore()

  if (!understandingSession || !understandingSession.overallScore) {
    return (
      <div className="text-center p-8 text-slate-400">
        No evaluation data found.
      </div>
    )
  }

  const score = understandingSession.overallScore || 0
  const dimensions = { problem_statement: score, constraints: score, edge_cases: score, optimal_approach: score }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
        <CardHeader className="border-b border-slate-800 pb-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-teal-500 mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold">Understanding Evaluation</CardTitle>
          <div className="text-4xl font-extrabold text-teal-400 mt-2">{score}%</div>
          <p className="text-slate-400 text-sm mt-1">{understandingSession.scores?.[0]?.feedback || "Good job"}</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-sm text-slate-300">Section Breakdown</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Problem Statement Understanding</span>
                <span className="font-bold text-teal-400">{dimensions.problem_statement || 0}%</span>
              </div>
              <ProgressBar value={dimensions.problem_statement || 0} indicatorClassName="bg-teal-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Constraints Awareness</span>
                <span className="font-bold text-teal-400">{dimensions.constraints || 0}%</span>
              </div>
              <ProgressBar value={dimensions.constraints || 0} indicatorClassName="bg-teal-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Edge Case Awareness</span>
                <span className="font-bold text-teal-400">{dimensions.edge_cases || 0}%</span>
              </div>
              <ProgressBar value={dimensions.edge_cases || 0} indicatorClassName="bg-teal-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Optimal Approach Identification</span>
                <span className="font-bold text-teal-400">{dimensions.optimal_approach || 0}%</span>
              </div>
              <ProgressBar value={dimensions.optimal_approach || 0} indicatorClassName="bg-teal-500" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-800 pt-4">
          <Button
            onClick={() => setPhase('coding')}
            className="w-full bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold border-none"
          >
            Start Coding
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

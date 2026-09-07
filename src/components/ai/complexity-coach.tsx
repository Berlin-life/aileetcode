'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Brain, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const COMPLEXITIES = [
  { value: 'O(1)', label: 'O(1) - Constant Time' },
  { value: 'O(log n)', label: 'O(log n) - Logarithmic Time' },
  { value: 'O(n)', label: 'O(n) - Linear Time' },
  { value: 'O(n log n)', label: 'O(n log n) - Linearithmic Time' },
  { value: 'O(n^2)', label: 'O(n²) - Quadratic Time' },
  { value: 'O(2^n)', label: 'O(2ⁿ) - Exponential Time' },
]

export function ComplexityCoach() {
  const { problem } = useProblemStore()
  const [timeComplexity, setTimeComplexity] = React.useState('')
  const [spaceComplexity, setSpaceComplexity] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [evaluation, setEvaluation] = React.useState<any>(null)

  if (!problem) return null

  const handleSubmit = async () => {
    if (!timeComplexity || !spaceComplexity) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/complexity/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problemId: problem.id,
          timeComplexity,
          spaceComplexity
        })
      })
      const data = await res.json()
      setEvaluation(data)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
      <CardHeader className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-teal-400" />
          <CardTitle className="text-lg font-bold">Complexity Coach</CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Identify the Big-O time and space complexities of your code.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {!evaluation ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Time Complexity</label>
              <Select value={timeComplexity} onValueChange={(val) => setTimeComplexity(val || '')}>
                <SelectTrigger className="w-full bg-slate-950 border-slate-800 focus:ring-1 focus:ring-teal-500">
                  <SelectValue placeholder="Select Time Complexity" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  {COMPLEXITIES.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="focus:bg-slate-800">
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Space Complexity</label>
              <Select value={spaceComplexity} onValueChange={(val) => setSpaceComplexity(val || '')}>
                <SelectTrigger className="w-full bg-slate-950 border-slate-800 focus:ring-1 focus:ring-teal-500">
                  <SelectValue placeholder="Select Space Complexity" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                  {COMPLEXITIES.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="focus:bg-slate-800">
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !timeComplexity || !spaceComplexity}
              className="w-full bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold border-none"
            >
              Check Answer
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm bg-slate-950 border border-slate-850 p-3 rounded-lg">
                <span className="text-slate-400">Time Complexity: {timeComplexity}</span>
                {evaluation.timeCorrect ? (
                  <span className="flex items-center text-emerald-400 text-xs font-bold gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Correct
                  </span>
                ) : (
                  <span className="flex items-center text-rose-400 text-xs font-bold gap-1">
                    <XCircle className="h-4 w-4" /> Incorrect
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm bg-slate-950 border border-slate-850 p-3 rounded-lg">
                <span className="text-slate-400">Space Complexity: {spaceComplexity}</span>
                {evaluation.spaceCorrect ? (
                  <span className="flex items-center text-emerald-400 text-xs font-bold gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Correct
                  </span>
                ) : (
                  <span className="flex items-center text-rose-400 text-xs font-bold gap-1">
                    <XCircle className="h-4 w-4" /> Incorrect
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-3 rounded text-xs leading-relaxed text-slate-300">
              <div className="font-bold text-teal-500 mb-1">Coach's Feedback:</div>
              <p className="mb-2">{evaluation.timeAnalysis}</p>
              <p>{evaluation.spaceAnalysis}</p>
              {evaluation.canBeImproved && (
                <div className="mt-3 p-2 bg-amber-950/20 border border-amber-900/40 rounded text-amber-400">
                  <span className="font-bold block mb-0.5">Optimization Hint:</span>
                  {evaluation.improvementHint}
                </div>
              )}
            </div>

            <Button
              onClick={() => {
                setEvaluation(null)
                setTimeComplexity('')
                setSpaceComplexity('')
              }}
              variant="outline"
              className="w-full border-slate-800 text-slate-300"
            >
              Reset Coach
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

'use client'

import * as React from 'react'
import { useProblemStore } from '@/stores/problem-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, ArrowRight, BrainCircuit } from 'lucide-react'
import type { UnderstandingQuestion } from '@/types'

export function UnderstandingGate() {
  const { problem, setPhase } = useProblemStore()
  const [loading, setLoading] = React.useState(true)
  const [questions, setQuestions] = React.useState<UnderstandingQuestion[]>([])
  const [currentIdx, setCurrentIdx] = React.useState(0)
  const [answers, setAnswers] = React.useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    async function fetchQuestions() {
      if (!problem) return
      setLoading(true)
      try {
        const res = await fetch('/api/understanding/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemId: problem.id })
        })
        const data = await res.json()
        setQuestions(data.questions || [])
        setAnswers(new Array(data.questions?.length || 0).fill(''))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [problem])

  const handleNext = () => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentIdx] = currentAnswer
    setAnswers(updatedAnswers)

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1)
      setCurrentAnswer(answers[currentIdx + 1] || '')
    } else {
      handleSubmit(updatedAnswers)
    }
  }

  const handleSubmit = async (finalAnswers: string[]) => {
    if (!problem) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/understanding/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problemId: problem.id, 
          questions, 
          answers: finalAnswers 
        })
      })
      const data = await res.json()
      // Store evaluation in problem store and show score phase
      useProblemStore.setState({ 
        understandingSession: {
          id: 1,
          userId: 'user-1',
          problemId: problem.id,
          questions,
          answers: questions.reduce((acc, q, idx) => ({ ...acc, [q.id]: finalAnswers[idx] }), {} as Record<string, string>),
          scores: [data],
          overallScore: data.score,
          completed: true,
          createdAt: new Date().toISOString()
        }
      })
      setPhase('review') // For score phase representation
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500 mb-3" />
        <p className="text-sm font-medium">AI is customized-generating questions for this problem...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">Failed to load understanding questions.</p>
        <Button onClick={() => setPhase('coding')} className="mt-4">Skip to Coding</Button>
      </div>
    )
  }

  const currentQuestion = questions[currentIdx]

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3 mb-2">
            <BrainCircuit className="h-6 w-6 text-teal-500 animate-pulse" />
            <CardTitle className="text-xl font-bold">Before You Code</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Let's clarify requirements and check your understanding. Question {currentIdx + 1} of {questions.length}
          </CardDescription>
          <div className="w-full bg-slate-850 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-teal-500 h-full transition-all duration-300" 
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-teal-400">{currentQuestion.text}</h3>
            <textarea
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-slate-300 resize-none"
              placeholder="Type your explanation here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-slate-800 pt-4">
          <Button
            variant="ghost"
            disabled={currentIdx === 0}
            onClick={() => {
              const updatedAnswers = [...answers]
              updatedAnswers[currentIdx] = currentAnswer
              setAnswers(updatedAnswers)
              setCurrentIdx(currentIdx - 1)
              setCurrentAnswer(answers[currentIdx - 1] || '')
            }}
            className="text-slate-400 hover:text-slate-200"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentAnswer.trim() || submitting}
            className="bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold border-none"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Evaluating...
              </>
            ) : currentIdx === questions.length - 1 ? (
              'Submit Answers'
            ) : (
              <>
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

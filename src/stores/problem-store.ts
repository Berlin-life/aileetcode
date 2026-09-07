'use client'

import { create } from 'zustand'
import type { Problem, UnderstandingSession, CodeExecutionResult } from '@/types'

type Phase = 'understanding' | 'coding' | 'review'

interface ProblemState {
  problem: Problem | null
  understandingSession: UnderstandingSession | null
  currentPhase: Phase
  code: string
  language: string
  hints: string[]
  testResults: CodeExecutionResult | null
  isSubmitting: boolean
  isRunning: boolean
  setProblem: (problem: Problem | null) => void
  setPhase: (phase: Phase) => void
  setCode: (code: string) => void
  setLanguage: (lang: string) => void
  addHint: (hint: string) => void
  setTestResults: (results: CodeExecutionResult | null) => void
  setIsSubmitting: (submitting: boolean) => void
  setIsRunning: (running: boolean) => void
  reset: () => void
}

export const useProblemStore = create<ProblemState>((set) => ({
  problem: null,
  understandingSession: null,
  currentPhase: 'understanding',
  code: '',
  language: 'java',
  hints: [],
  testResults: null,
  isSubmitting: false,
  isRunning: false,
  setProblem: (problem) => set({ problem }),
  setPhase: (currentPhase) => set({ currentPhase }),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  addHint: (hint) => set((state) => ({ hints: [...state.hints, hint] })),
  setTestResults: (testResults) => set({ testResults }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsRunning: (isRunning) => set({ isRunning }),
  reset: () => set({ problem: null, understandingSession: null, currentPhase: 'understanding', code: '', hints: [], testResults: null })
}))

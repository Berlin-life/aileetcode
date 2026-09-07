import type { Problem, UnderstandingQuestion, UnderstandingScore, AIMessage } from '@/types'

export interface AIProvider {
  generateUnderstandingQuestions(problem: Problem, previousAnswers?: string[]): Promise<UnderstandingQuestion[]>
  evaluateUnderstanding(problem: Problem, questions: UnderstandingQuestion[], answers: string[]): Promise<UnderstandingScore>
  getHint(problem: Problem, hintLevel: number, studentContext: string): Promise<string>
  reviewCode(problem: Problem, code: string, language: string): Promise<CodeReviewResult>
  chat(messages: AIMessage[], systemPrompt: string): Promise<string>
  evaluateApproach(problem: Problem, approach: string): Promise<ApproachEvaluation>
  evaluatePatternRecognition(problem: Problem, selectedPattern: string): Promise<PatternEvaluation>
  evaluateEdgeCases(problem: Problem, edgeCases: string[]): Promise<EdgeCaseEvaluation>
  evaluateComplexity(problem: Problem, timeComplexity: string, spaceComplexity: string): Promise<ComplexityEvaluation>
}

export interface CodeReviewResult {
  correctness: number // 1-10
  timeComplexity: { score: number, analysis: string, expected: string, actual: string }
  spaceComplexity: { score: number, analysis: string, expected: string, actual: string }
  readability: number // 1-10
  edgeCases: { score: number, missed: string[] }
  overallFeedback: string
  improvements: string[]
}

export interface ApproachEvaluation {
  isCorrect: boolean
  feedback: string
  followUpQuestion?: string
}

export interface PatternEvaluation {
  isCorrect: boolean
  correctPattern: string
  explanation: string
}

export interface EdgeCaseEvaluation {
  score: number
  identified: string[]
  missed: string[]
  feedback: string
}

export interface ComplexityEvaluation {
  timeCorrect: boolean
  spaceCorrect: boolean
  timeAnalysis: string
  spaceAnalysis: string
  canBeImproved: boolean
  improvementHint?: string
}

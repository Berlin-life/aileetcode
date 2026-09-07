import type { Problem, UnderstandingQuestion, UnderstandingScore, AIMessage } from '@/types'
import type { 
  AIProvider, 
  CodeReviewResult, 
  ApproachEvaluation, 
  PatternEvaluation, 
  EdgeCaseEvaluation, 
  ComplexityEvaluation 
} from '../types'

export class OpenAIProvider implements AIProvider {
  // TODO: Add OpenAI SDK initialization here
  // import OpenAI from 'openai'
  // private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  async generateUnderstandingQuestions(problem: Problem, previousAnswers?: string[]): Promise<UnderstandingQuestion[]> {
    throw new Error('Not implemented')
  }

  async evaluateUnderstanding(problem: Problem, questions: UnderstandingQuestion[], answers: string[]): Promise<UnderstandingScore> {
    throw new Error('Not implemented')
  }

  async getHint(problem: Problem, hintLevel: number, studentContext: string): Promise<string> {
    throw new Error('Not implemented')
  }

  async reviewCode(problem: Problem, code: string, language: string): Promise<CodeReviewResult> {
    throw new Error('Not implemented')
  }

  async chat(messages: AIMessage[], systemPrompt: string): Promise<string> {
    throw new Error('Not implemented')
  }

  async evaluateApproach(problem: Problem, approach: string): Promise<ApproachEvaluation> {
    throw new Error('Not implemented')
  }

  async evaluatePatternRecognition(problem: Problem, selectedPattern: string): Promise<PatternEvaluation> {
    throw new Error('Not implemented')
  }

  async evaluateEdgeCases(problem: Problem, edgeCases: string[]): Promise<EdgeCaseEvaluation> {
    throw new Error('Not implemented')
  }

  async evaluateComplexity(problem: Problem, timeComplexity: string, spaceComplexity: string): Promise<ComplexityEvaluation> {
    throw new Error('Not implemented')
  }
}

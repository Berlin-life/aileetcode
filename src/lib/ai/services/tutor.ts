import { getAIProvider } from '../factory'
import { isDevMode } from '@/lib/auth-helper'
import { getProblemBySlug } from '@/lib/problems-data'
import { sql, ensureDbSchema } from '@/lib/db'
import type { Problem, AIMessage } from '@/types'
import type { ApproachEvaluation, PatternEvaluation } from '../types'

export class TutorService {
  static async chat(userId: string, problemId: string, message: string, history: AIMessage[] = []): Promise<string> {
    const provider = getAIProvider()
    const systemPrompt = "You are a helpful Socratic tutor guiding a student through a coding problem. Do not give direct answers."
    
    const messages = [...history, { role: 'user', content: message } as AIMessage]
    
    return await provider.chat(messages, systemPrompt)
  }

  private static async fetchProblem(problemId: string): Promise<Problem> {
    if (!isDevMode()) {
      try {
        await ensureDbSchema()
        const rows = await sql`SELECT * FROM problems WHERE slug = ${problemId} OR id::text = ${problemId} LIMIT 1;`
        if (rows.length > 0) return rows[0] as any
      } catch (err: any) {
        console.warn('[TutorService fetchProblem]', err.message)
      }
    }
    const p = getProblemBySlug(problemId) || getProblemBySlug('two-sum')!
    return {
      id: p.slug,
      title: p.title,
      slug: p.slug,
      description: p.description,
      difficulty: p.difficulty as any,
      constraints: p.constraints,
      examples: p.examples,
      solution: { python: '', javascript: '', java: '', cpp: '' },
      topics: p.topics,
      patterns: p.pattern ? [p.pattern] : [],
      expectedTimeComplexity: 'O(N)',
      expectedSpaceComplexity: 'O(1)',
      hints: [],
      createdAt: new Date().toISOString()
    }
  }

  static async evaluateApproach(userId: string, problemId: string, approach: string): Promise<ApproachEvaluation> {
    const problem = await this.fetchProblem(problemId)
    const provider = getAIProvider()
    return await provider.evaluateApproach(problem, approach)
  }

  static async evaluatePattern(userId: string, problemId: string, pattern: string): Promise<PatternEvaluation> {
    const problem = await this.fetchProblem(problemId)
    const provider = getAIProvider()
    return await provider.evaluatePatternRecognition(problem, pattern)
  }
}

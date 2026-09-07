import { getAIProvider } from '../factory'
import { isDevMode } from '@/lib/auth-helper'
import { getProblemBySlug } from '@/lib/problems-data'
import { sql, ensureDbSchema } from '@/lib/db'
import type { Problem } from '@/types'
import type { CodeReviewResult, ComplexityEvaluation } from '../types'

export class CodeReviewService {
  private static async fetchProblem(problemId: string): Promise<Problem> {
    if (!isDevMode()) {
      try {
        await ensureDbSchema()
        const rows = await sql`SELECT * FROM problems WHERE slug = ${problemId} OR id::text = ${problemId} LIMIT 1;`
        if (rows.length > 0) return rows[0] as any
      } catch (err: any) {
        console.warn('[CodeReviewService fetchProblem]', err.message)
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

  static async reviewSubmission(userId: string, problemId: string, code: string, language: string): Promise<CodeReviewResult> {
    const problem = await this.fetchProblem(problemId)
    const provider = getAIProvider()
    return await provider.reviewCode(problem, code, language)
  }

  static async evaluateComplexity(userId: string, problemId: string, timeClaim: string, spaceClaim: string): Promise<ComplexityEvaluation> {
    const problem = await this.fetchProblem(problemId)
    const provider = getAIProvider()
    return await provider.evaluateComplexity(problem, timeClaim, spaceClaim)
  }
}

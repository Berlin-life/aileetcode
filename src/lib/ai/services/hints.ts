import { getAIProvider } from '../factory'
import { isDevMode } from '@/lib/auth-helper'
import { getProblemBySlug } from '@/lib/problems-data'
import { sql, ensureDbSchema } from '@/lib/db'
import type { Problem, HintRecord } from '@/types'

export class HintService {
  static async getNextHint(userId: string, problemId: string): Promise<{ hint: string; level: number; maxLevel: number }> {
    let problem: Problem | null = null

    if (!isDevMode()) {
      try {
        await ensureDbSchema()
        const rows = await sql`SELECT * FROM problems WHERE slug = ${problemId} OR id::text = ${problemId} LIMIT 1;`
        if (rows.length > 0) problem = rows[0] as any
      } catch (err: any) {
        console.warn('[HintService getNextHint]', err.message)
      }
    }

    if (!problem) {
      const p = getProblemBySlug(problemId) || getProblemBySlug('two-sum')!
      problem = {
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

    const nextLevel = 1
    const provider = getAIProvider()
    const hint = await provider.getHint(problem, nextLevel, "")

    return { hint, level: nextLevel, maxLevel: 5 }
  }

  static async getHintHistory(userId: string, problemId: string): Promise<HintRecord[]> {
    return []
  }

  static async getHintDependency(userId: string): Promise<number> {
    return 35
  }

  static async getHintDependencyForProblem(userId: string, problemId: string): Promise<number> {
    return 20
  }
}

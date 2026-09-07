import { isDevMode } from '@/lib/auth-helper'
import { getProblemBySlug } from '@/lib/problems-data'
import { sql, ensureDbSchema } from '@/lib/db'
import type { Recommendation, DailyChallenge } from '@/types'

export class RecommendationService {
  static async getRecommendations(userId: string, count: number = 5): Promise<Recommendation[]> {
    let problems: any[] = []

    if (!isDevMode()) {
      try {
        await ensureDbSchema()
        const rows = await sql`SELECT * FROM problems LIMIT ${count};`
        if (rows.length > 0) problems = rows
      } catch (err: any) {
        console.warn('[RecommendationService getRecommendations]', err.message)
      }
    }

    if (problems.length === 0) {
      problems = [
        getProblemBySlug('two-sum'),
        getProblemBySlug('valid-parentheses'),
        getProblemBySlug('climbing-stairs')
      ].filter(Boolean)
    }

    return problems.map(p => ({
      id: `rec_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId: userId,
      factors: { 'recent_activity': 1 },
      createdAt: new Date().toISOString(),
      problemId: p.slug || p.id,
      problem: p,
      reason: 'Recommended based on your recent activity',
      score: 0.85
    })) as Recommendation[]
  }

  static async getDailyChallenge(userId: string): Promise<DailyChallenge | null> {
    const problem = getProblemBySlug('two-sum')
    if (!problem) return null

    return {
      id: 'dc-1',
      challengeDate: new Date().toISOString().split('T')[0],
      problemId: problem.slug,
      focusTopic: 'Array & Hashing',
      reason: 'Daily challenge',
      createdAt: new Date().toISOString()
    }
  }

  static calculateRecommendationScore(userId: string, problemId: string): number {
    return 0.85
  }
}

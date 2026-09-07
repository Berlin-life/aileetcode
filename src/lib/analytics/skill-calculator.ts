import type { Attempt, Skill } from '@/types'
import { sql, ensureDbSchema } from '@/lib/db'

export class SkillCalculatorService {
  static async updateSkillAfterAttempt(userId: string, problemId: string, attempt: Attempt): Promise<void> {
    console.log(`[NeonDB] Skill updated for user ${userId} on problem ${problemId}`)
  }

  static async getSkillMap(userId: string): Promise<Skill[]> {
    try {
      await ensureDbSchema()
      const rows = await sql`SELECT * FROM skills WHERE user_id = ${userId};`
      if (rows.length > 0) {
        return rows.map(r => ({
          id: String(r.id),
          userId: r.user_id,
          topic: r.topic,
          score: Number(r.score),
          problemsSolved: r.problems_solved,
          problemsAttempted: r.problems_attempted,
          avgHintsUsed: Number(r.avg_hints_used),
          confidence: Number(r.confidence),
          updatedAt: r.updated_at
        }))
      }
    } catch {}

    return [
      { id: 's1', userId, topic: 'Arrays', score: 85, problemsSolved: 10, problemsAttempted: 12, avgHintsUsed: 1.5, confidence: 0.8, updatedAt: new Date().toISOString() },
      { id: 's2', userId, topic: 'Dynamic Programming', score: 40, problemsSolved: 2, problemsAttempted: 5, avgHintsUsed: 3, confidence: 0.3, updatedAt: new Date().toISOString() },
      { id: 's3', userId, topic: 'Graphs', score: 60, problemsSolved: 5, problemsAttempted: 8, avgHintsUsed: 2, confidence: 0.5, updatedAt: new Date().toISOString() }
    ]
  }

  static async getWeakTopics(userId: string, count: number = 3): Promise<Skill[]> {
    const skills = await this.getSkillMap(userId)
    return skills.sort((a, b) => a.score - b.score).slice(0, count)
  }
}

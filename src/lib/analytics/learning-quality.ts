import type { LearningQualityScore } from '@/types'

export class LearningQualityService {
  static async calculateScore(userId: string): Promise<LearningQualityScore> {
    return {
      overall: 82,
      understanding: 85,
      independence: 70,
      efficiency: 90
    }
  }

  static async getProgressOverTime(userId: string): Promise<LearningQualityScore[]> {
    return []
  }
}

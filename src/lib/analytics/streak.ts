export class StreakService {
  static async recordActivity(userId: string): Promise<void> {
    // Implementation
  }

  static async getStreak(userId: string): Promise<{ current: number, longest: number }> {
    return { current: 5, longest: 12 }
  }

  static async getWeeklyStats(userId: string): Promise<any> {
    return {
      problemsSolved: 14,
      timeSpentHours: 4.5,
      newConcepts: 3
    }
  }
}

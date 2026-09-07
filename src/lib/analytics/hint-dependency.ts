export class HintDependencyService {
  static async calculateOverall(userId: string): Promise<number> {
    return 25.5
  }

  static async calculateForProblem(userId: string, problemId: string): Promise<number> {
    return 10.0
  }

  static async getTrend(userId: string): Promise<number[]> {
    return [40, 35, 30, 25, 20, 25, 25] // Last 7 days
  }
}

import { getAIProvider } from '../factory'
import { getProblemBySlug } from '@/lib/problems-data'
import type { Problem, UnderstandingQuestion, UnderstandingScore } from '@/types'

export class ProblemUnderstandingService {
  static buildProblemObject(problemIdOrSlug: string): Problem {
    const foundProblem = getProblemBySlug(problemIdOrSlug)
    if (foundProblem) {
      return {
        id: foundProblem.slug,
        title: foundProblem.title,
        slug: foundProblem.slug,
        description: foundProblem.description,
        difficulty: foundProblem.difficulty as any,
        constraints: foundProblem.constraints,
        examples: foundProblem.examples,
        solution: { python: '', javascript: '', java: '', cpp: '' },
        topics: foundProblem.topics,
        patterns: foundProblem.pattern ? [foundProblem.pattern] : [],
        expectedTimeComplexity: 'O(N)',
        expectedSpaceComplexity: 'O(1)',
        hints: [],
        createdAt: new Date().toISOString()
      }
    }
    return {
      id: problemIdOrSlug,
      title: problemIdOrSlug,
      slug: problemIdOrSlug,
      description: 'Problem description',
      difficulty: 'easy',
      constraints: [],
      examples: [],
      solution: { python: '', javascript: '', java: '', cpp: '' },
      topics: ['Array'],
      patterns: [],
      expectedTimeComplexity: 'O(N)',
      expectedSpaceComplexity: 'O(1)',
      hints: [],
      createdAt: new Date().toISOString()
    }
  }

  static async generateQuestions(problemIdOrSlug: string, userId?: string): Promise<UnderstandingQuestion[]> {
    const problem = this.buildProblemObject(problemIdOrSlug)
    const provider = getAIProvider()
    return await provider.generateUnderstandingQuestions(problem)
  }

  static async evaluateAnswers(
    problemIdOrSlug: string,
    questions: UnderstandingQuestion[] | undefined,
    answers: string[]
  ): Promise<UnderstandingScore> {
    const problem = this.buildProblemObject(problemIdOrSlug)
    const evalQuestions: UnderstandingQuestion[] = (questions && questions.length > 0) ? questions : [
      { id: 'q1', text: 'Explain your proposed solution approach, time complexity, and how you will handle edge cases.', type: 'approach' }
    ]

    const provider = getAIProvider()
    return await provider.evaluateUnderstanding(problem, evalQuestions, answers)
  }
}

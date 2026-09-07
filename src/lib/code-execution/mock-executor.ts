import type { CodeExecutionRequest, CodeExecutionResult, CodeExecutor } from './types'
import type { TestCaseResult } from '@/types'

export class MockCodeExecutor implements CodeExecutor {
  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500))

    const isCompilationError = request.code.includes('syntax_error')
    if (isCompilationError) {
      return {
        status: 'compilation_error',
        message: 'SyntaxError: Unexpected token',
        testResults: [],
        passedCount: 0,
        totalCount: 3
      }
    }

    const isTLE = request.code.includes('while(true)')
    if (isTLE) {
      return {
        status: 'time_limit_exceeded',
        message: 'Time Limit Exceeded',
        testResults: [],
        passedCount: 0,
        totalCount: 3
      }
    }

    const isWrong = request.code.length < 20 // Arbitrary condition for wrong answer
    const status = isWrong ? 'wrong_answer' : 'accepted'
    
    const testResults: TestCaseResult[] = [
      { passed: !isWrong, expectedOutput: 'true', actualOutput: isWrong ? 'false' : 'true', executionTimeMs: 12 },
      { passed: !isWrong, expectedOutput: 'false', actualOutput: isWrong ? 'true' : 'false', executionTimeMs: 14 },
      { passed: true, expectedOutput: 'true', actualOutput: 'true', executionTimeMs: 11 },
    ]

    return {
      status,
      runtime: 37,
      memory: 4.2,
      testResults,
      passedCount: testResults.filter(t => t.passed).length,
      totalCount: testResults.length
    }
  }
}

import type { TestCaseResult } from '@/types'

export interface CodeExecutionRequest {
  problemId: string
  code: string
  language: string
  customInput?: string
}

export interface CodeExecutionResult {
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'compilation_error' | 'time_limit_exceeded'
  message?: string
  runtime?: number
  memory?: number
  testResults: TestCaseResult[]
  passedCount: number
  totalCount: number
}

export interface CodeExecutor {
  execute(request: CodeExecutionRequest): Promise<CodeExecutionResult>
}

import type { CodeExecutionRequest, CodeExecutionResult, CodeExecutor } from './types'
import type { TestCaseResult } from '@/types'
import { MockCodeExecutor } from './mock-executor'

export class Judge0Executor implements CodeExecutor {
  private mockExecutor = new MockCodeExecutor()

  private getLanguageId(language: string): number {
    const map: Record<string, number> = {
      'javascript': 63,
      'python': 71,
      'java': 62,
      'cpp': 54,
      'c++': 54,
      'c': 50,
      'typescript': 74
    }
    return map[language.toLowerCase()] || 63
  }

  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    const apiKey = process.env.RAPIDAPI_KEY
    const apiHost = process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com'
    
    // Fall back to Mock Executor if credentials are missing or default
    if (!apiKey || apiKey === 'your_rapidapi_key_here') {
      console.log('[Judge0Executor] Missing or default RapidAPI key — delegating to MockCodeExecutor')
      return this.mockExecutor.execute(request)
    }

    const headers = {
      'content-type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }

    // Submit code
    const submitRes = await fetch(`https://${apiHost}/submissions?base64_encoded=false`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        language_id: this.getLanguageId(request.language),
        source_code: request.code,
        stdin: request.customInput || ''
      })
    })

    if (!submitRes.ok) {
      throw new Error(`Judge0 submission failed: ${await submitRes.text()}`)
    }

    const { token } = await submitRes.json()

    // Poll for results
    let result: any = null;
    let attempts = 0;
    while (attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const pollRes = await fetch(`https://${apiHost}/submissions/${token}?base64_encoded=false`, {
        headers
      });
      if (!pollRes.ok) {
        throw new Error(`Judge0 poll failed: ${await pollRes.text()}`)
      }
      
      const pollData = await pollRes.json();
      if (pollData.status.id >= 3) {
        result = pollData;
        break;
      }
      attempts++;
    }

    if (!result) {
      throw new Error("Judge0 execution timed out")
    }

    let status: CodeExecutionResult['status'] = 'runtime_error';
    if (result.status.id === 3) status = 'accepted';
    else if (result.status.id === 4) status = 'wrong_answer';
    else if (result.status.id === 5) status = 'time_limit_exceeded';
    else if (result.status.id === 6) status = 'compilation_error';
    else if (result.status.id >= 7 && result.status.id <= 12) status = 'runtime_error';

    const testResults: TestCaseResult[] = [{
      passed: status === 'accepted',
      expectedOutput: '',
      actualOutput: result.stdout || result.stderr || result.compile_output || '',
      executionTimeMs: result.time ? parseFloat(result.time) * 1000 : 0
    }];

    return {
      status,
      message: result.compile_output || result.stderr || result.message || undefined,
      runtime: result.time ? parseFloat(result.time) * 1000 : undefined,
      memory: result.memory,
      testResults,
      passedCount: status === 'accepted' ? 1 : 0,
      totalCount: 1
    }
  }
}

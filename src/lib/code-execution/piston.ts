import type { CodeExecutionRequest, CodeExecutionResult, CodeExecutor } from './types'
import type { TestCaseResult } from '@/types'
import { getProblemBySlug } from '@/lib/problems-data'
import { MockCodeExecutor } from './mock-executor'

interface PistonExecuteResponse {
  language: string
  version: string
  run?: {
    stdout: string
    stderr: string
    code: number
    signal: string | null
    output: string
  }
  compile?: {
    stdout: string
    stderr: string
    code: number
    signal: string | null
    output: string
  }
  message?: string
}

export class PistonExecutor implements CodeExecutor {
  private mockExecutor = new MockCodeExecutor()

  private normalizeLanguage(lang: string): string {
    const map: Record<string, string> = {
      'javascript': 'javascript',
      'js': 'javascript',
      'python': 'python',
      'py': 'python',
      'python3': 'python',
      'typescript': 'typescript',
      'ts': 'typescript',
      'cpp': 'c++',
      'c++': 'c++',
      'c': 'c',
      'java': 'java',
      'go': 'go',
      'rust': 'rust',
      'rs': 'rust'
    }
    return map[lang.toLowerCase()] || lang.toLowerCase()
  }

  private normalizeOutput(str: string): string {
    return str.trim().replace(/\s+/g, '').replace(/"/g, '').replace(/'/g, '').toLowerCase()
  }

  async execute(request: CodeExecutionRequest): Promise<CodeExecutionResult> {
    const pistonUrl = process.env.PISTON_API_URL || 'https://emkc.org/api/v2/piston'
    const language = this.normalizeLanguage(request.language)
    const startTime = Date.now()

    // 1. If custom input is provided, execute standard single run
    if (request.customInput) {
      return this.executeCustomInput(pistonUrl, language, request.code, request.customInput, startTime)
    }

    // 2. Fetch problem examples for standard test suites
    const problem = getProblemBySlug(request.problemId)
    const testCases = problem?.examples.map(ex => ({
      input: ex.input,
      expectedOutput: ex.output
    })) || [
      { input: 'Default Input 1', expectedOutput: 'Default Output 1' },
      { input: 'Default Input 2', expectedOutput: 'Default Output 2' }
    ]

    // Execute test cases
    if (language === 'javascript' || language === 'python') {
      return this.executeWrappedTestCases(pistonUrl, language, request.code, testCases, startTime)
    }

    // For other languages or raw execution, run per test case stdin
    return this.executeStdinTestCases(pistonUrl, language, request.code, testCases, startTime)
  }

  private async executeCustomInput(
    pistonUrl: string,
    language: string,
    code: string,
    stdin: string,
    startTime: number
  ): Promise<CodeExecutionResult> {
    try {
      const res = await fetch(`${pistonUrl}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          version: '*',
          files: [{ content: code }],
          stdin
        })
      })

      if (!res.ok) {
        throw new Error(`Piston API HTTP ${res.status}: ${await res.text()}`)
      }

      const data: PistonExecuteResponse = await res.json()

      if (data.compile && data.compile.code !== 0) {
        return {
          status: 'compilation_error',
          message: data.compile.stderr || data.compile.stdout,
          testResults: [{
            passed: false,
            expectedOutput: '',
            actualOutput: data.compile.stderr || data.compile.stdout,
            executionTimeMs: Date.now() - startTime
          }],
          passedCount: 0,
          totalCount: 1
        }
      }

      const run = data.run || { stdout: '', stderr: '', code: 0, output: '', signal: null }
      const isError = run.code !== 0 || run.signal !== null
      const output = run.stdout || run.stderr || run.output || ''

      return {
        status: isError ? 'runtime_error' : 'accepted',
        message: run.stderr || undefined,
        runtime: Date.now() - startTime,
        testResults: [{
          passed: !isError,
          expectedOutput: '',
          actualOutput: output.trim(),
          executionTimeMs: Date.now() - startTime
        }],
        passedCount: isError ? 0 : 1,
        totalCount: 1
      }
    } catch (err: any) {
      return {
        status: 'runtime_error',
        message: err.message,
        testResults: [{
          passed: false,
          expectedOutput: '',
          actualOutput: `Piston Error: ${err.message}`,
          executionTimeMs: Date.now() - startTime
        }],
        passedCount: 0,
        totalCount: 1
      }
    }
  }

  private async executeWrappedTestCases(
    pistonUrl: string,
    language: string,
    code: string,
    testCases: { input: string; expectedOutput: string }[],
    startTime: number
  ): Promise<CodeExecutionResult> {
    let wrappedCode = code
    if (language === 'javascript') {
      wrappedCode = `
${code}

const testInputs = ${JSON.stringify(testCases.map(t => t.input))};
function parseArgs(inp) {
  const parts = inp.split(',');
  const res = [];
  for (const p of parts) {
    if (p.includes('=')) {
      const val = p.split('=')[1].trim();
      try { res.push(JSON.parse(val)); } catch(e) { res.push(val); }
    } else {
      try { res.push(JSON.parse(p.trim())); } catch(e) { res.push(p.trim()); }
    }
  }
  return res;
}

const fnKeys = Object.keys(this).filter(k => typeof this[k] === 'function' && k !== 'parseArgs');
const fn = fnKeys.length > 0 ? this[fnKeys[fnKeys.length - 1]] : null;

for (const inp of testInputs) {
  try {
    if (typeof moveZeroes === 'function') {
      const args = parseArgs(inp);
      moveZeroes(args[0]);
      console.log("RESULT:" + JSON.stringify(args[0]));
    } else if (typeof twoSum === 'function') {
      const args = parseArgs(inp);
      console.log("RESULT:" + JSON.stringify(twoSum(...args)));
    } else if (fn) {
      const args = parseArgs(inp);
      console.log("RESULT:" + JSON.stringify(fn(...args)));
    } else {
      console.log("RESULT:No function found");
    }
  } catch(e) {
    console.log("ERROR:" + e.message);
  }
}
`
    } else if (language === 'python') {
      wrappedCode = `
import json, sys, ast

${code}

def parse_input(inp_str):
    parts = inp_str.split(',')
    res = []
    for p in parts:
        if '=' in p:
            val = p.split('=', 1)[1].strip()
            try:
                res.append(ast.literal_eval(val))
            except:
                res.append(val)
        else:
            try:
                res.append(ast.literal_eval(p.strip()))
            except:
                res.append(p.strip())
    return res

test_inputs = ${JSON.stringify(testCases.map(t => t.input))}
funcs = [obj for name, obj in list(globals().items()) if callable(obj) and not name.startswith("__") and name != "parse_input"]
target_fn = funcs[-1] if funcs else None

for inp in test_inputs:
    try:
        if target_fn:
            args = parse_input(inp)
            if target_fn.__name__ == "moveZeroes" and args:
                target_fn(args[0])
                print("RESULT:" + json.dumps(args[0]))
            else:
                res = target_fn(*args)
                print("RESULT:" + json.dumps(res))
        else:
            print("RESULT:No function defined")
    except Exception as e:
        print("ERROR:" + str(e))
`
    }

    try {
      const res = await fetch(`${pistonUrl}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          version: '*',
          files: [{ content: wrappedCode }]
        })
      })

      if (!res.ok) {
        throw new Error(`Piston API HTTP ${res.status}: ${await res.text()}`)
      }

      const data: PistonExecuteResponse = await res.json()

      if (data.compile && data.compile.code !== 0) {
        return {
          status: 'compilation_error',
          message: data.compile.stderr || data.compile.stdout,
          testResults: testCases.map(tc => ({
            passed: false,
            expectedOutput: tc.expectedOutput,
            actualOutput: `Compilation Error: ${data.compile?.stderr || data.compile?.stdout}`,
            executionTimeMs: Date.now() - startTime
          })),
          passedCount: 0,
          totalCount: testCases.length
        }
      }

      const run = data.run || { stdout: '', stderr: '', code: 0, output: '', signal: null }
      const lines = run.stdout.trim().split('\n').filter(l => l.startsWith('RESULT:') || l.startsWith('ERROR:'))

      let passedCount = 0
      const testResults: TestCaseResult[] = testCases.map((tc, i) => {
        const line = lines[i] || (run.stderr ? `ERROR:${run.stderr}` : 'ERROR:No output')
        if (line.startsWith('RESULT:')) {
          const actualOutput = line.slice(7)
          const passed = this.normalizeOutput(actualOutput) === this.normalizeOutput(tc.expectedOutput) ||
                         actualOutput.includes(this.normalizeOutput(tc.expectedOutput))
          if (passed) passedCount++
          return {
            passed,
            expectedOutput: tc.expectedOutput,
            actualOutput,
            executionTimeMs: Math.max(5, Math.floor((Date.now() - startTime) / testCases.length))
          }
        } else {
          return {
            passed: false,
            expectedOutput: tc.expectedOutput,
            actualOutput: line.slice(6),
            executionTimeMs: Math.max(5, Math.floor((Date.now() - startTime) / testCases.length))
          }
        }
      })

      const allPassed = passedCount === testCases.length
      const status = run.signal === 'SIGKILL' ? 'time_limit_exceeded'
                   : (run.code !== 0 && passedCount === 0) ? 'runtime_error'
                   : allPassed ? 'accepted' : 'wrong_answer'

      return {
        status,
        runtime: Date.now() - startTime,
        testResults,
        passedCount,
        totalCount: testCases.length
      }
    } catch (err: any) {
      return this.mockExecutor.execute({ problemId: '', code, language, customInput: '' })
    }
  }

  private async executeStdinTestCases(
    pistonUrl: string,
    language: string,
    code: string,
    testCases: { input: string; expectedOutput: string }[],
    startTime: number
  ): Promise<CodeExecutionResult> {
    const testResults: TestCaseResult[] = []
    let passedCount = 0

    for (const tc of testCases) {
      const tcStart = Date.now()
      try {
        const res = await fetch(`${pistonUrl}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language,
            version: '*',
            files: [{ content: code }],
            stdin: tc.input
          })
        })

        if (!res.ok) {
          throw new Error(`Piston API HTTP ${res.status}`)
        }

        const data: PistonExecuteResponse = await res.json()

        if (data.compile && data.compile.code !== 0) {
          return {
            status: 'compilation_error',
            message: data.compile.stderr || data.compile.stdout,
            testResults: [{
              passed: false,
              expectedOutput: tc.expectedOutput,
              actualOutput: data.compile.stderr || data.compile.stdout,
              executionTimeMs: Date.now() - tcStart
            }],
            passedCount: 0,
            totalCount: testCases.length
          }
        }

        const run = data.run || { stdout: '', stderr: '', code: 0, output: '', signal: null }
        const actualOutput = (run.stdout || run.stderr || run.output || '').trim()
        const passed = run.code === 0 && (
          this.normalizeOutput(actualOutput) === this.normalizeOutput(tc.expectedOutput) ||
          actualOutput.includes(this.normalizeOutput(tc.expectedOutput))
        )

        if (passed) passedCount++

        testResults.push({
          passed,
          expectedOutput: tc.expectedOutput,
          actualOutput: run.code !== 0 ? `Runtime Error: ${run.stderr || actualOutput}` : actualOutput,
          executionTimeMs: Date.now() - tcStart
        })
      } catch (err: any) {
        testResults.push({
          passed: false,
          expectedOutput: tc.expectedOutput,
          actualOutput: `Error: ${err.message}`,
          executionTimeMs: Date.now() - tcStart
        })
      }
    }

    const allPassed = passedCount === testCases.length
    return {
      status: allPassed ? 'accepted' : 'wrong_answer',
      runtime: Date.now() - startTime,
      testResults,
      passedCount,
      totalCount: testCases.length
    }
  }
}

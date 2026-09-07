import { CodeExecutor } from './types'
import { LocalCodeExecutor } from './local-executor'
import { Judge0Executor } from './judge0'
import { PistonExecutor } from './piston'

export function getCodeExecutor(): CodeExecutor {
  const executor = process.env.CODE_EXECUTOR || 'piston'
  switch (executor) {
    case 'piston':
      return new PistonExecutor()
    case 'judge0':
      if (!process.env.RAPIDAPI_KEY || process.env.RAPIDAPI_KEY === 'your_rapidapi_key_here') {
        return new LocalCodeExecutor()
      }
      return new Judge0Executor()
    case 'local':
    case 'mock':
    default:
      return new LocalCodeExecutor()
  }
}


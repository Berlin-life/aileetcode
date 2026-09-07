import { AIProvider } from './types'
import { MockAIProvider } from './providers/mock'
import { OpenAIProvider } from './providers/openai'
import { AnthropicProvider } from './providers/anthropic'
import { GeminiProvider } from './providers/gemini'

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || 'gemini'
  switch (provider) {
    case 'gemini':
      return new GeminiProvider()
    case 'anthropic':
      return new AnthropicProvider()
    case 'openai':
      return new OpenAIProvider()
    case 'mock':
    default:
      if (process.env.GEMINI_API_KEY) {
        return new GeminiProvider()
      }
      return new MockAIProvider()
  }
}

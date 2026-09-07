import { AIProvider } from './types'
import { MockAIProvider } from './providers/mock'
import { OpenAIProvider } from './providers/openai'
import { AnthropicProvider } from './providers/anthropic'

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || 'mock'
  switch (provider) {
    case 'mock':
      return new MockAIProvider()
    case 'openai':
      return new OpenAIProvider()
    case 'anthropic':
      return new AnthropicProvider()
    default:
      return new MockAIProvider()
  }
}

import { AIProvider } from './types'
import { MockAIProvider } from './providers/mock'
import { OpenAIProvider } from './providers/openai'
import { AnthropicProvider } from './providers/anthropic'
import { GeminiProvider } from './providers/gemini'

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || 'gemini'
  const geminiKey = process.env.GEMINI_API_KEY
  const isGeminiValid = Boolean(geminiKey && geminiKey.length > 20)

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const isAnthropicValid = Boolean(anthropicKey && anthropicKey.startsWith('sk-ant'))

  switch (provider) {
    case 'gemini':
      if (isGeminiValid) {
        return new GeminiProvider()
      }
      return new MockAIProvider()
    case 'anthropic':
      if (isAnthropicValid) {
        return new AnthropicProvider()
      }
      return new MockAIProvider()
    case 'openai':
      return new OpenAIProvider()
    case 'mock':
    default:
      if (isGeminiValid) {
        return new GeminiProvider()
      }
      return new MockAIProvider()
  }
}

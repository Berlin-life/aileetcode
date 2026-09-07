import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { getAIProvider } from '@/lib/ai/factory'

/**
 * POST /api/chat
 * Body: { messages: AIMessage[], problemTitle?: string, systemPrompt?: string }
 *
 * Streams a Socratic mentor response using the configured AI provider.
 */
export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const body = await request.json()
    const { messages, systemPrompt, problemTitle } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
    }

    const ai = getAIProvider()

    const system = systemPrompt ?? `You are a Socratic coding mentor helping students learn Data Structures and Algorithms.
Your goal is NOT to give direct answers but to guide the student to discover the solution themselves.
Problem context: ${problemTitle ?? 'a DSA problem'}.

Rules:
- Ask one guiding question at a time
- If the student is stuck, give a tiny nudge — never the full answer
- Celebrate breakthroughs with genuine enthusiasm
- Keep responses concise (2-4 sentences max)
- Use code snippets sparingly and only when truly helpful`

    const reply = await ai.chat(messages, system)
    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('[/api/chat] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { HintService } from '@/lib/ai/services/hints'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const { problemId } = await request.json()
    const result = await HintService.getNextHint(user.id, problemId)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

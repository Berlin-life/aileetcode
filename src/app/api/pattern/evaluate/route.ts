import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { TutorService } from '@/lib/ai/services/tutor'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const { problemId, selectedPattern } = await request.json()
    const result = await TutorService.evaluatePattern(user.id, problemId, selectedPattern)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

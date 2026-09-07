import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { ProblemUnderstandingService } from '@/lib/ai/services/understanding'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const { problemId } = await request.json()
    const questions = await ProblemUnderstandingService.generateQuestions(problemId, user.id)
    return NextResponse.json({ questions })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

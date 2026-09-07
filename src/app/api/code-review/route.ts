import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { CodeReviewService } from '@/lib/ai/services/code-review'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const { problemId, code, language } = await request.json()
    const result = await CodeReviewService.reviewSubmission(user.id, problemId, code, language)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

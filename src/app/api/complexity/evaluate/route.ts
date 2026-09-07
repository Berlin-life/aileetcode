import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { CodeReviewService } from '@/lib/ai/services/code-review'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const { problemId, timeComplexity, spaceComplexity } = await request.json()
    const result = await CodeReviewService.evaluateComplexity(user.id, problemId, timeComplexity, spaceComplexity)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

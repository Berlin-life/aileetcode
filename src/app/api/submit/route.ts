import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { getCodeExecutor } from '@/lib/code-execution/factory'
import { CodeReviewService } from '@/lib/ai/services/code-review'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const body = await request.json()
    const executor = getCodeExecutor()
    const executionResult = await executor.execute(body)
    
    let reviewResult = null
    if (executionResult.status === 'accepted') {
      reviewResult = await CodeReviewService.reviewSubmission(user.id, body.problemId, body.code, body.language)
    }

    return NextResponse.json({ execution: executionResult, review: reviewResult })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

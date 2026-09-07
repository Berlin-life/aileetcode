import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { getCodeExecutor } from '@/lib/code-execution/factory'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const body = await request.json()
    const executor = getCodeExecutor()
    const result = await executor.execute(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

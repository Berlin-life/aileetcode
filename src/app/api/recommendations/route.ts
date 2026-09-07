import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { RecommendationService } from '@/lib/ai/services/recommendations'

export async function GET(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const recommendations = await RecommendationService.getRecommendations(user.id, 5)
    return NextResponse.json({ recommendations })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

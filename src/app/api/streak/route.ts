import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { StreakService } from '@/lib/analytics/streak'

export async function GET(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const streak = await StreakService.getStreak(user.id)
    const stats = await StreakService.getWeeklyStats(user.id)
    return NextResponse.json({ streak, stats })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

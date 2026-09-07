import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth-helper'
import { SkillCalculatorService } from '@/lib/analytics/skill-calculator'

export async function GET(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const skills = await SkillCalculatorService.getSkillMap(user.id)
    return NextResponse.json({ skills })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { requireUser, isDevMode } from '@/lib/auth-helper'
import { sql, ensureDbSchema } from '@/lib/db'

const MOCK_PROFILE = {
  id: 'dev-user',
  email: 'dev@codementer.ai',
  full_name: 'Dev User',
  xp: 1250,
  streak: 5,
  level: 3,
}

export async function GET(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  if (isDevMode()) {
    return NextResponse.json({ profile: MOCK_PROFILE })
  }

  try {
    await ensureDbSchema()
    const rows = await sql`SELECT * FROM profiles WHERE id = ${user.id} OR email = ${user.email} LIMIT 1;`
    if (rows.length > 0) {
      return NextResponse.json({ profile: rows[0] })
    }
  } catch (err: any) {
    console.warn('[NeonDB GET Profile]', err.message)
  }

  return NextResponse.json({ profile: MOCK_PROFILE })
}

export async function PUT(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const body = await request.json()

    if (isDevMode()) {
      Object.assign(MOCK_PROFILE, body)
      return NextResponse.json({ success: true, profile: MOCK_PROFILE })
    }

    await ensureDbSchema()
    if (body.name || body.full_name) {
      await sql`
        UPDATE profiles
        SET name = ${body.name || body.full_name}, updated_at = NOW()
        WHERE id = ${user.id} OR email = ${user.email};
      `
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

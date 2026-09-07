import { NextResponse } from 'next/server'
import { requireUser, isDevMode } from '@/lib/auth-helper'
import { getProblemBySlug } from '@/lib/problems-data'
import { sql, ensureDbSchema } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { user, response } = await requireUser()
  if (!user) return response!

  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Serving from problem registry fallback or Neon DB
  if (isDevMode()) {
    const problem = getProblemBySlug(slug)
    return NextResponse.json({ problem })
  }

  try {
    await ensureDbSchema()
    const rows = await sql`SELECT * FROM problems WHERE slug = ${slug} LIMIT 1;`
    if (rows.length > 0) {
      return NextResponse.json({ problem: rows[0] })
    }
  } catch (err: any) {
    console.warn('[NeonDB GET Problem Slug]', err.message)
  }

  const problem = getProblemBySlug(slug)
  if (!problem) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ problem })
}

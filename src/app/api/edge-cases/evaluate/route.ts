import { NextResponse } from 'next/server'
import { requireUser, isDevMode } from '@/lib/auth-helper'
import { getAIProvider } from '@/lib/ai/factory'
import { getProblemBySlug } from '@/lib/problems-data'
import { sql, ensureDbSchema } from '@/lib/db'
import type { Problem } from '@/types'

export async function POST(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  try {
    const { problemId, edgeCases } = await request.json()
    let problem: Problem | null = null

    if (!isDevMode()) {
      try {
        await ensureDbSchema()
        const rows = await sql`SELECT * FROM problems WHERE slug = ${problemId} OR id::text = ${problemId} LIMIT 1;`
        if (rows.length > 0) problem = rows[0] as any
      } catch (err: any) {
        console.warn('[EdgeCases evaluate]', err.message)
      }
    }

    if (!problem) {
      const p = getProblemBySlug(problemId) || getProblemBySlug('two-sum')!
      problem = {
        id: p.slug,
        title: p.title,
        slug: p.slug,
        description: p.description,
        difficulty: p.difficulty as any,
        constraints: p.constraints,
        examples: p.examples,
        solution: { python: '', javascript: '', java: '', cpp: '' },
        topics: p.topics,
        patterns: p.pattern ? [p.pattern] : [],
        expectedTimeComplexity: 'O(N)',
        expectedSpaceComplexity: 'O(1)',
        hints: [],
        createdAt: new Date().toISOString()
      }
    }

    const provider = getAIProvider()
    const result = await provider.evaluateEdgeCases(problem, edgeCases)
    
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

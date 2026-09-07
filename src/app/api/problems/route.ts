import { NextResponse } from 'next/server'
import { requireUser, isDevMode } from '@/lib/auth-helper'
import { sql, ensureDbSchema } from '@/lib/db'

const MOCK_PROBLEMS = [
  {
    id: 'two-sum',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'Arrays & Hashing',
    acceptance_rate: 49.2,
    topic: 'Array',
  },
  {
    id: 'valid-parentheses',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    category: 'Stack',
    acceptance_rate: 40.5,
    topic: 'Stack',
  },
  {
    id: 'climbing-stairs',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    category: 'Dynamic Programming',
    acceptance_rate: 52.1,
    topic: 'Dynamic Programming',
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    category: 'Arrays & Hashing',
    acceptance_rate: 54.3,
    topic: 'Array',
  },
  {
    id: 'product-of-array-except-self',
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    category: 'Arrays & Hashing',
    acceptance_rate: 65.1,
    topic: 'Array',
  },
  {
    id: 'container-with-most-water',
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'medium',
    category: 'Two Pointers',
    acceptance_rate: 54.1,
    topic: 'Two Pointers',
  }
]

export async function GET(request: Request) {
  const { user, response } = await requireUser()
  if (!user) return response!

  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get('difficulty')

  if (isDevMode()) {
    let filtered = MOCK_PROBLEMS
    if (difficulty) {
      filtered = filtered.filter(p => p.difficulty === difficulty)
    }
    return NextResponse.json({ problems: filtered })
  }

  try {
    await ensureDbSchema()
    let data
    if (difficulty) {
      data = await sql`SELECT * FROM problems WHERE difficulty = ${difficulty};`
    } else {
      data = await sql`SELECT * FROM problems;`
    }

    if (data && data.length > 0) {
      return NextResponse.json({ problems: data })
    }
  } catch (err: any) {
    console.warn('[NeonDB GET Problems]', err.message)
  }

  let filtered = MOCK_PROBLEMS
  if (difficulty) {
    filtered = filtered.filter(p => p.difficulty === difficulty)
  }
  return NextResponse.json({ problems: filtered })
}

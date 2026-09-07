'use server'

import { sql, ensureDbSchema } from '@/lib/db'
import { getOptionalUser } from '@/lib/auth-helper'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { UserProfile, UserLevel, UserGoal } from '@/types'

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  await ensureDbSchema()

  const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`

  try {
    await sql`
      INSERT INTO profiles (id, name, email, onboarding_completed, level, xp, current_streak)
      VALUES (${userId}, ${name || 'Learner'}, ${email}, false, 1, 0, 0)
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
    `

    const cookieStore = await cookies()
    cookieStore.set('auth_user', JSON.stringify({ id: userId, email, name: name || 'Learner' }), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  } catch (err: any) {
    return { error: err.message }
  }

  redirect('/onboarding')
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required' }
  }

  await ensureDbSchema()

  try {
    const rows = await sql`SELECT * FROM profiles WHERE email = ${email} LIMIT 1;`
    let userRow = rows[0]

    if (!userRow) {
      const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`
      const newRows = await sql`
        INSERT INTO profiles (id, name, email, onboarding_completed, level, xp)
        VALUES (${userId}, ${email.split('@')[0]}, ${email}, false, 1, 0)
        RETURNING *;
      `
      userRow = newRows[0]
    }

    const cookieStore = await cookies()
    cookieStore.set('auth_user', JSON.stringify({ id: userRow.id, email: userRow.email, name: userRow.name }), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30
    })
  } catch (err: any) {
    return { error: err.message }
  }

  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const cookieStore = await cookies()
  cookieStore.set('auth_user', JSON.stringify({ id: 'demo-user-123', email: 'demo@risingbrain.org', name: 'Google Learner' }), {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30
  })
  redirect('/dashboard')
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_user')
  cookieStore.delete('demo_session')
  redirect('/login')
}

export async function getUser(): Promise<UserProfile | null> {
  const { user } = await getOptionalUser()
  if (!user) return null

  try {
    await ensureDbSchema()
    const rows = await sql`SELECT * FROM profiles WHERE id = ${user.id} OR email = ${user.email} LIMIT 1;`
    if (rows.length > 0) {
      const p = rows[0]
      return {
        id: p.id,
        name: p.name || 'Learner',
        email: p.email,
        avatarUrl: p.avatar_url,
        level: p.level || 1,
        goal: p.goal || 'Crack FAANG',
        xp: p.xp || 0,
        currentStreak: p.current_streak || 0,
        longestStreak: p.longest_streak || 0,
        onboardingCompleted: p.onboarding_completed || false,
        createdAt: p.created_at,
        updatedAt: p.updated_at
      } as UserProfile
    }
  } catch {}

  return {
    id: user.id,
    name: (user as any).name || 'Learner',
    email: user.email,
    level: 1,
    goal: 'Crack FAANG',
    xp: 100,
    currentStreak: 1,
    longestStreak: 1,
    onboardingCompleted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } as UserProfile
}

export async function updateProfile(data: Partial<UserProfile>) {
  const { user } = await getOptionalUser()
  if (!user) throw new Error('Not authenticated')

  try {
    await ensureDbSchema()
    await sql`
      UPDATE profiles
      SET name = COALESCE(${data.name || null}, name),
          level = COALESCE(${data.level || null}, level),
          xp = COALESCE(${data.xp || null}, xp),
          updated_at = NOW()
      WHERE id = ${user.id} OR email = ${user.email};
    `
  } catch (err: any) {
    console.warn('[NeonDB] Update profile fallback:', err.message)
  }

  revalidatePath('/profile')
  return { success: true }
}

export async function completeOnboarding(level: UserLevel, goal: UserGoal) {
  const { user } = await getOptionalUser()
  if (!user) throw new Error('Not authenticated')

  try {
    await ensureDbSchema()
    await sql`
      UPDATE profiles
      SET level = ${level},
          goal = ${goal},
          onboarding_completed = true,
          updated_at = NOW()
      WHERE id = ${user.id} OR email = ${user.email};
    `
  } catch (err: any) {
    console.warn('[NeonDB] Complete onboarding fallback:', err.message)
  }

  redirect('/dashboard')
}

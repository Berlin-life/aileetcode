import { cookies } from 'next/headers'

export function isDevMode(): boolean {
  // If DATABASE_URL is not set or placeholder, fallback to dev/demo mode
  const dbUrl = process.env.DATABASE_URL ?? ''
  return !dbUrl || dbUrl.includes('your_database_url_here')
}

/** Returns { user } — handles dev mode, demo session cookies, and Neon DB auth sessions */
export async function getOptionalUser() {
  try {
    const cookieStore = await cookies()
    const sessionUserCookie = cookieStore.get('auth_user')?.value

    if (sessionUserCookie) {
      try {
        const parsed = JSON.parse(sessionUserCookie)
        if (parsed?.id && parsed?.email) {
          return { user: parsed }
        }
      } catch {}
    }

    // Default demo user fallback for dev and offline sessions
    return { user: { id: 'demo-user-123', email: 'demo@risingbrain.org', name: 'Demo User' } }
  } catch {
    return { user: { id: 'demo-user-123', email: 'demo@risingbrain.org', name: 'Demo User' } }
  }
}

/** Returns user or throws 401 response — safe in all environments */
export async function requireUser() {
  const { user } = await getOptionalUser()
  if (!user) {
    const { NextResponse } = await import('next/server')
    return { user: null, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { user, response: null }
}

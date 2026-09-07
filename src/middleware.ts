import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hasUserCookie = request.cookies.has('auth_user') || request.cookies.has('demo_session')

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/problems') ||
    request.nextUrl.pathname.startsWith('/learn') ||
    request.nextUrl.pathname.startsWith('/practice') ||
    request.nextUrl.pathname.startsWith('/revision') ||
    request.nextUrl.pathname.startsWith('/progress') ||
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/achievements')

  if (!hasUserCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (hasUserCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

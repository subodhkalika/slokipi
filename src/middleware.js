import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/calendar', '/availability', '/events', '/bookings', '/clients', '/integrations', '/billing', '/notifications', '/settings']
const AUTH_PATHS = ['/login', '/signup', '/forgot-password', '/reset-password']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  if (!isLoggedIn && PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoggedIn && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
}

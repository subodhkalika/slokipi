import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/calendar', '/availability', '/events', '/bookings', '/clients', '/integrations', '/billing', '/notifications', '/settings']
const AUTH_PATHS = ['/login', '/signup', '/forgot-password', '/reset-password']

export async function middleware(request) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Protect app routes — redirect to login if not authenticated
  if (!user && PROTECTED_PATHS.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from auth pages
  if (user && AUTH_PATHS.includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}

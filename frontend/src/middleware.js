import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const isAdminPath = pathname.startsWith('/admin')
  const isLoginPath = pathname === '/admin/login'

  // The refresh token is stored as httpOnly cookie — we check for its presence
  // as a lightweight guard. The backend still validates the actual token.
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (isAdminPath && !isLoginPath && !refreshToken) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPath && refreshToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

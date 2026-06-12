import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const isAdminPath = pathname.startsWith('/admin')
  const isLoginPath = pathname === '/admin/login'

  // adminLoggedIn is a lightweight same-domain cookie set by the client after a
  // successful login. It lets the middleware gate admin routes without depending on
  // the httpOnly refreshToken cookie, which lives on the API domain and is therefore
  // invisible to the Next.js server in cross-domain deployments (e.g. Render).
  // The backend still validates real tokens on every API request.
  const adminLoggedIn = request.cookies.get('adminLoggedIn')?.value

  if (isAdminPath && !isLoginPath && !adminLoggedIn) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPath && adminLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

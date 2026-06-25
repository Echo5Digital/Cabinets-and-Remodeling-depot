'use client'

import { useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { useAuth } from '@/hooks/useAuth'
import api, { refreshAccessToken } from '@/lib/api'

// Proactively refresh the access token just before it expires (15 min lifetime).
// Firing at 14 min keeps the token perpetually alive while the admin is working,
// which eliminates reactive mid-work refreshes and the logouts they can cause.
const PROACTIVE_REFRESH_MS = 14 * 60 * 1000

function renewSignalCookie() {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `adminLoggedIn=1; path=/; max-age=604800; SameSite=Lax${secure}`
}

function clearSignalCookie() {
  document.cookie = 'adminLoggedIn=; path=/; max-age=0'
}

export function AdminLayoutClient({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, setUserFromToken } = useAuth()
  const isLoginPage = pathname === '/admin/login'

  /**
   * Restore the user session from the httpOnly refresh token cookie when the
   * user state is empty (happens after a hard page refresh because the access
   * token lives only in memory).
   *
   * Uses the shared refreshAccessToken() function so this call is properly
   * coordinated with any concurrent refresh attempts from the API interceptor,
   * preventing the token-reuse race condition that logs the user out.
   */
  useEffect(() => {
    if (isLoginPage || user) return

    let cancelled = false

    async function restoreSession() {
      try {
        const newToken = await refreshAccessToken()

        // Mark this request with _noRetry so the response interceptor does NOT
        // attempt a second token refresh if /auth/me returns 401.  A second
        // refresh here would use an already-rotated refresh token and fail,
        // causing a spurious logout.  Any 401 from /auth/me is handled below.
        const { data: meData } = await api.get('/auth/me', { _noRetry: true })

        if (!cancelled) {
          setUserFromToken(meData.data, newToken)
          // Keep the signal cookie expiry in sync with the rotated refresh token
          renewSignalCookie()
        }
      } catch (err) {
        if (!cancelled) {
          // Only destroy the session on actual auth failures (401/403).
          // Network errors (server sleeping, timeout, DNS) must NOT log the
          // user out — they should stay in the app and retry when the server recovers.
          const isAuthError = err.response?.status === 401 || err.response?.status === 403
          if (isAuthError) {
            clearSignalCookie()
            router.replace('/admin/login')
          }
        }
      }
    }

    restoreSession()
    return () => {
      cancelled = true
    }
  }, [isLoginPage, user, setUserFromToken, router])

  /**
   * Proactive token refresh interval.
   *
   * Silently refreshes the access token every 14 minutes while the admin is
   * logged in. This prevents the token from ever expiring mid-work (e.g. while
   * writing a long blog post), which is the primary cause of unexpected logouts.
   *
   * Uses the same shared refreshAccessToken() as the response interceptor, so
   * concurrent calls are safely queued — never triggering backend token-reuse
   * detection.
   */
  useEffect(() => {
    if (isLoginPage || !user) return

    const interval = setInterval(async () => {
      try {
        await refreshAccessToken()
        renewSignalCookie()
      } catch {
        // Silently ignore — only an explicit logout click should navigate to
        // the login page. A failed background refresh (network blip, server
        // restart, etc.) must never interrupt the admin's work.
      }
    }, PROACTIVE_REFRESH_MS)

    return () => clearInterval(interval)
  }, [isLoginPage, user])

  // ── Login page: render completely standalone (no sidebar, no chrome) ──
  if (isLoginPage) {
    return <>{children}</>
  }

  // ── All other admin pages: render with the sidebar layout ──
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 pt-16 md:p-8">{children}</div>
      </main>
    </div>
  )
}

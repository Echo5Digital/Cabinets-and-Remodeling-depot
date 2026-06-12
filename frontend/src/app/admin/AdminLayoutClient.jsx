'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
import { setAccessToken } from '@/lib/auth'

export function AdminLayoutClient({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, setUserFromToken } = useAuth()
  const isLoginPage = pathname === '/admin/login'

  /**
   * Restore the user session from the httpOnly refresh token cookie when
   * the user state is empty — this happens after a hard page refresh on
   * any admin route (access token lives only in memory).
   *
   * Steps:
   *   1. POST /auth/refresh → get a fresh access token (rotates the refresh cookie too)
   *   2. GET  /auth/me      → fetch user info and populate the context
   *
   * If either request fails (no cookie / expired), the middleware already
   * redirected the user to /admin/login, so we just stay silent.
   */
  useEffect(() => {
    // Skip on login page or if user is already known
    if (isLoginPage || user) return

    let cancelled = false

    async function restoreSession() {
      try {
        const { data: refreshData } = await api.post('/auth/refresh')
        setAccessToken(refreshData.data.accessToken)

        const { data: meData } = await api.get('/auth/me')
        if (!cancelled) {
          setUserFromToken(meData.data, refreshData.data.accessToken)
        }
      } catch {
        if (!cancelled) {
          // Session is invalid — clear the signal cookie and send to login.
          document.cookie = 'adminLoggedIn=; path=/; max-age=0'
          router.replace('/admin/login')
        }
      }
    }

    restoreSession()
    return () => {
      cancelled = true
    }
  }, [isLoginPage, user, setUserFromToken, router])

  // ── Login page: render completely standalone (no sidebar, no chrome) ──
  if (isLoginPage) {
    return <>{children}</>
  }

  // ── All other admin pages: render with the sidebar layout ──
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}

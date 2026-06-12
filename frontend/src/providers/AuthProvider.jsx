'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import api from '@/lib/api'
import { setAccessToken, clearAccessToken } from '@/lib/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setAccessToken(data.data.accessToken)
      setUser(data.data.user)
      return data.data
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // Ignore logout errors
    } finally {
      clearAccessToken()
      setUser(null)
      // Clear the same-domain signal cookie so the middleware stops allowing
      // admin route access immediately after logout.
      if (typeof document !== 'undefined') {
        document.cookie = 'adminLoggedIn=; path=/; max-age=0'
      }
    }
  }, [])

  const setUserFromToken = useCallback((userData, token) => {
    setAccessToken(token)
    setUser(userData)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setUserFromToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}

import axios from 'axios'
import { getAccessToken, setAccessToken, clearAccessToken } from './auth.js'

// On the browser, route through the Next.js rewrite proxy (/api/*) so the
// request is same-origin and the httpOnly refresh-token cookie is always sent
// regardless of SameSite restrictions. On the server (SSR/RSC), call the
// backend directly since there is no browser cookie involved.
const BASE_URL =
  typeof window !== 'undefined'
    ? '/api'
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api')

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send httpOnly cookies automatically
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Request interceptor: attach access token ─────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Shared refresh state — prevents concurrent refresh requests ──────────────
let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

/**
 * Refresh the access token using the httpOnly refresh token cookie.
 *
 * All concurrent callers (response interceptor, session restore, proactive
 * interval) share the same isRefreshing flag so only ONE refresh request is
 * ever in-flight at a time. Subsequent callers are queued and resolved with
 * the same new token, eliminating the backend token-reuse race condition.
 *
 * Throws on failure — callers decide whether to redirect to login.
 */
export async function refreshAccessToken() {
  // If a refresh is already running, queue this caller and wait for the result
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject })
    })
  }

  isRefreshing = true
  try {
    const { data } = await axios.post(
      `${BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    )
    const newToken = data.data.accessToken
    setAccessToken(newToken)
    processQueue(null, newToken)
    return newToken
  } catch (err) {
    processQueue(err, null)
    clearAccessToken()
    throw err
  } finally {
    isRefreshing = false
  }
}

// ─── Response interceptor: silent token refresh on 401 ───────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Only retry on 401 with TOKEN_EXPIRED, not on login failures or other 401s.
    // Skip retry for requests explicitly marked _noRetry (e.g. post-refresh /auth/me
    // inside session restore — retrying there could use an already-rotated token).
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry &&
      !originalRequest._noRetry
    ) {
      originalRequest._retry = true

      try {
        const newToken = await refreshAccessToken()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Never auto-navigate — only an explicit logout click should send the
        // admin to the login page. Transient network issues or a temporarily
        // unavailable backend must not destroy an active session.
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { api }
export default api

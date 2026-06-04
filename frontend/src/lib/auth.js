/**
 * In-memory access token store.
 * Access tokens are stored in memory (not localStorage) for security.
 * Refresh tokens are in httpOnly cookies (managed by the backend).
 */

let accessToken = null

export function getAccessToken() {
  return accessToken
}

export function setAccessToken(token) {
  accessToken = token
}

export function clearAccessToken() {
  accessToken = null
}

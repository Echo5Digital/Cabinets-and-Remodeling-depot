import { Resend } from 'resend'

// Lazy initialization — only throw at send time, not at import time
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export default resend

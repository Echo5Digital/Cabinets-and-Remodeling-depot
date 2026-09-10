/**
 * Verifies a Google reCAPTCHA v2 token against Google's siteverify endpoint.
 */
export async function verifyRecaptcha(req, res, next) {
  try {
    const { recaptchaToken } = req.body

    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: recaptchaToken,
      remoteip: req.ip,
    })

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    const result = await response.json()

    if (!result.success) {
      return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed. Please try again.' })
    }

    next()
  } catch (err) {
    next(err)
  }
}

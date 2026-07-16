import transporter from '../config/resend.js'

const ADMIN_EMAIL = 'sales@cabinetsandremodelingdepot.com'
const FROM_EMAIL = process.env.SMTP_USER
const COMPANY_NAME = 'Cabinets & Remodeling Depot'
const COMPANY_PHONE_DISPLAY = process.env.COMPANY_PHONE_DISPLAY || '(813) 651-2333'
const COMPANY_PHONE_HREF = process.env.COMPANY_PHONE || '+18136512333'
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://cabinetsremodelingdepot.com'

/**
 * Notify admin of a new lead submission.
 */
export async function sendLeadNotification(lead) {
  try {
    const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ')
    const siteTitle = COMPANY_NAME
    const siteUrl = FRONTEND_URL

    await transporter.sendMail({
      from: `${COMPANY_NAME} <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${fullName} — ${lead.service || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: #811121; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-family: monospace; font-size: 14px; line-height: 1.8; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 16px; white-space: pre-wrap; word-break: break-word;">Name: ${fullName}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Service: ${lead.service || 'Not specified'}
Subject: ${lead.subject || 'Not provided'}

Message:
${lead.message}

--
This is a notification that a contact form was submitted on your website (${siteTitle} ${siteUrl}).</p>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('[Email] Failed to send lead notification:', error.message)
    // Don't throw — email failure shouldn't block lead creation
  }
}

/**
 * Send auto-reply confirmation to the lead.
 */
export async function sendAutoReply(lead) {
  try {
    await transporter.sendMail({
      from: `${COMPANY_NAME} <${FROM_EMAIL}>`,
      to: lead.email,
      subject: `We received your message, ${lead.firstName}! — ${COMPANY_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="background: #811121; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">${COMPANY_NAME}</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Tampa Bay's Premier Remodeling Company</p>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #811121; margin-top: 0;">Thank You, ${lead.firstName}!</h2>
            <p>We've received your message and a member of our team will contact you within <strong>24 business hours</strong>.</p>

            <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; margin: 24px 0; border-left: 4px solid #811121;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #555;">Your Request Summary:</p>
              <p style="margin: 4px 0; color: #666;"><strong>Service:</strong> ${lead.service || 'General Inquiry'}</p>
              <p style="margin: 4px 0; color: #666;"><strong>Message:</strong> ${lead.message.substring(0, 200)}${lead.message.length > 200 ? '...' : ''}</p>
            </div>

            <h3 style="color: #333;">While You Wait...</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li>View our <a href="${FRONTEND_URL}/gallery" style="color: #811121;">photo gallery</a></li>
              <li>Read our <a href="${FRONTEND_URL}/blog" style="color: #811121;">remodeling tips blog</a></li>
            </ul>

            <div style="margin-top: 24px; padding: 16px; background: #f9f9f9; border-radius: 6px; text-align: center;">
              <p style="margin: 0 0 4px; font-weight: bold;">Need to reach us sooner?</p>
              <p style="margin: 0; color: #555;">Call us at <a href="tel:${COMPANY_PHONE_HREF}" style="color: #811121;">${COMPANY_PHONE_DISPLAY}</a></p>
            </div>

            <p style="margin-top: 24px; color: #999; font-size: 12px; text-align: center;">
              ${COMPANY_NAME} | Valrico, FL 33594<br>
              <a href="${FRONTEND_URL}" style="color: #811121;">cabinetsremodelingdepot.com</a>
            </p>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('[Email] Failed to send auto-reply:', error.message)
    // Don't throw — email failure shouldn't block lead creation
  }
}

import Lead from '../models/Lead.js'
import { sendLeadNotification, sendAutoReply } from '../services/email.service.js'

/**
 * POST /api/leads (public)
 */
export async function createLead(req, res, next) {
  try {
    const { firstName, lastName, email, phone, service, message, source } = req.body

    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      phone: phone || null,
      service: service || null,
      message,
      source: source || 'website',
    })

    // Fire emails async — don't wait, don't fail request if email fails
    Promise.all([sendLeadNotification(lead), sendAutoReply(lead)]).catch((err) =>
      console.error('[Lead] Email error:', err.message)
    )

    res.status(201).json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      data: { id: lead.id },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/leads (admin)
 */
export async function getAllLeads(req, res, next) {
  try {
    const { page = 1, limit = 20, status, search } = req.query

    const filter = {}
    if (status) filter.status = status

    if (search) {
      const regex = new RegExp(search, 'i')
      filter.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
      ]
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [leads, total, rawCounts] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Lead.countDocuments(filter),
      Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ])

    const statusCounts = Object.fromEntries(rawCounts.map((r) => [r._id, r.count]))

    res.json({
      success: true,
      data: leads,
      statusCounts,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/leads/:id (admin)
 */
export async function getLeadById(req, res, next) {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found.' })
    }
    res.json({ success: true, data: lead })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/leads/:id (admin)
 */
export async function updateLead(req, res, next) {
  try {
    const { id } = req.params
    const { status, notes, respondedAt } = req.body

    const lead = await Lead.findById(id)
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found.' })
    }

    const updateFields = {}
    if (status) updateFields.status = status
    if (notes !== undefined) updateFields.notes = notes
    if (respondedAt !== undefined) updateFields.respondedAt = respondedAt ? new Date(respondedAt) : null

    const updated = await Lead.findByIdAndUpdate(id, { $set: updateFields }, { new: true })

    res.json({ success: true, data: updated })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/leads/:id (admin)
 */
export async function deleteLead(req, res, next) {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found.' })
    }
    res.json({ success: true, message: 'Lead deleted.' })
  } catch (err) {
    next(err)
  }
}

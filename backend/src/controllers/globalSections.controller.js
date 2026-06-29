import GlobalSection from '../models/GlobalSection.js'

/**
 * GET /api/global-sections
 * Returns all global sections (public — needed for frontend rendering).
 */
export async function getAllGlobalSections(req, res, next) {
  try {
    const sections = await GlobalSection.find({ isActive: true }).sort({ title: 1 })
    res.json({ success: true, data: sections })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/global-sections/admin
 * Returns all global sections including inactive ones (admin only).
 */
export async function getAllGlobalSectionsAdmin(req, res, next) {
  try {
    const sections = await GlobalSection.find().sort({ title: 1 })
    res.json({ success: true, data: sections })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/global-sections  [PROTECTED]
 * Create a new global section.
 */
export async function createGlobalSection(req, res, next) {
  try {
    const { key, title, sectionType, data, isActive } = req.body

    if (!key || !title || !sectionType) {
      return res.status(400).json({
        success: false,
        error: 'key, title, and sectionType are required.',
      })
    }

    const existing = await GlobalSection.findOne({ key })
    if (existing) {
      return res.status(409).json({
        success: false,
        error: `A global section with key "${key}" already exists.`,
      })
    }

    const section = await GlobalSection.create({
      key,
      title,
      sectionType,
      data: data || {},
      isActive: isActive !== undefined ? isActive : true,
    })

    res.status(201).json({ success: true, data: section })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/global-sections/:id  [PROTECTED]
 * Update a global section.
 */
export async function updateGlobalSection(req, res, next) {
  try {
    const { id } = req.params
    const { title, data, isActive } = req.body

    const section = await GlobalSection.findByIdAndUpdate(
      id,
      { $set: { ...(title && { title }), ...(data && { data }), ...(isActive !== undefined && { isActive }) } },
      { new: true }
    )

    if (!section) {
      return res.status(404).json({ success: false, error: 'Global section not found.' })
    }

    res.json({ success: true, data: section })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/global-sections/:id  [PROTECTED]
 * Delete a global section.
 */
export async function deleteGlobalSection(req, res, next) {
  try {
    const { id } = req.params

    const section = await GlobalSection.findByIdAndDelete(id)
    if (!section) {
      return res.status(404).json({ success: false, error: 'Global section not found.' })
    }

    res.json({ success: true, message: 'Global section deleted.' })
  } catch (err) {
    next(err)
  }
}

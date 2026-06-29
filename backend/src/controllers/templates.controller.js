import Template from '../models/Template.js'

/**
 * GET /api/templates  [PROTECTED]
 * Returns all templates, sorted by category then name.
 */
export async function getAllTemplates(req, res, next) {
  try {
    const templates = await Template.find()
      .select('id name description category sections createdAt')
      .sort({ category: 1, name: 1 })
    res.json({ success: true, data: templates })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/templates  [PROTECTED]
 * Create a new template (single section or multi-section).
 */
export async function createTemplate(req, res, next) {
  try {
    const { name, description, category, sections } = req.body

    if (!name) {
      return res.status(400).json({ success: false, error: 'name is required.' })
    }

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ success: false, error: 'sections must be a non-empty array.' })
    }

    const template = await Template.create({
      name,
      description: description || null,
      category: category || 'general',
      sections,
      createdBy: req.user?.id || null,
    })

    res.status(201).json({ success: true, data: template })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/templates/:id  [PROTECTED]
 * Delete a template.
 */
export async function deleteTemplate(req, res, next) {
  try {
    const { id } = req.params

    const template = await Template.findByIdAndDelete(id)
    if (!template) {
      return res.status(404).json({ success: false, error: 'Template not found.' })
    }

    res.json({ success: true, message: 'Template deleted.' })
  } catch (err) {
    next(err)
  }
}

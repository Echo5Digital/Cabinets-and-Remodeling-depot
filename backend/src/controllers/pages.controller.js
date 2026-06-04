import Page from '../models/Page.js'
import { mergePageContent } from '../services/pages.service.js'

/**
 * GET /api/pages
 * Returns all pages (metadata only, no content).
 */
export async function getAllPages(req, res, next) {
  try {
    const pages = await Page.find({ isActive: true })
      .select('slug title description updatedAt')
      .sort({ title: 1 })

    res.json({ success: true, data: pages })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/pages/:slug
 * Returns a page with its embedded content JSON.
 */
export async function getPageBySlug(req, res, next) {
  try {
    const { slug } = req.params

    const page = await Page.findOne({ slug })

    if (!page || !page.isActive) {
      return res.status(404).json({ success: false, error: 'Page not found.' })
    }

    res.json({
      success: true,
      data: {
        id: page.id,
        slug: page.slug,
        title: page.title,
        description: page.description,
        content: page.content || {},
        updatedAt: page.updatedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/admin/pages/:slug
 * Merge updates into the page's embedded content document.
 * No transaction needed — single atomic findOneAndUpdate.
 */
export async function updatePageContent(req, res, next) {
  try {
    const { slug } = req.params
    const { content: updates, title, description } = req.body

    // Find the current page
    const page = await Page.findOne({ slug })

    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found.' })
    }

    // Merge incoming updates with existing content
    const mergedContent = mergePageContent(page.content || {}, updates || {})

    const updateFields = { content: mergedContent }
    if (title) updateFields.title = title
    if (description !== undefined) updateFields.description = description

    const updated = await Page.findOneAndUpdate(
      { slug },
      { $set: updateFields },
      { new: true }
    )

    res.json({
      success: true,
      message: 'Page content updated successfully.',
      data: { slug, content: updated.content },
    })
  } catch (err) {
    next(err)
  }
}

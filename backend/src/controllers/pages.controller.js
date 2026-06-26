import Page from '../models/Page.js'
import { mergePageContent, getDefaultContent } from '../services/pages.service.js'

/**
 * All pages managed by the CMS.
 * Adding a slug here + a matching getDefaultContent entry auto-seeds the page in MongoDB.
 */
const KNOWN_PAGES = [
  { slug: 'home',                       title: 'Home' },
  { slug: 'about',                      title: 'About Us' },
  { slug: 'contact',                    title: 'Contact Us' },
  { slug: 'services',                   title: 'Our Services' },
  { slug: 'kitchen-remodeling-tampa',   title: 'Kitchen Remodeling Tampa' },
  { slug: 'bathroom-remodeling-tampa',  title: 'Bathroom Remodeling Tampa' },
  { slug: 'kitchen-cabinets-tampa',     title: 'Kitchen Cabinets Tampa' },
  { slug: 'countertops-tampa',          title: 'Countertops Tampa' },
  { slug: 'flooring-in-tampa',          title: 'Flooring in Tampa' },
  { slug: 'wood-flooring',              title: 'Wood Flooring' },
  { slug: 'tiles-in-tampa',             title: 'Tiles in Tampa' },
  { slug: 'laminate-flooring-in-tampa', title: 'Laminate Flooring' },
  { slug: 'showroom-gallery',           title: 'Showroom Gallery' },
  { slug: 'privacy-policy',             title: 'Privacy Policy' },
  { slug: 'terms',                      title: 'Terms of Service' },
]

/**
 * Legacy slug → new URL slug mapping.
 * When an old-slug document is found in MongoDB it is renamed to the new slug
 * and its content is refreshed to the new section format.
 */
const OLD_SLUG_MAP = {
  'kitchen-remodeling':  'kitchen-remodeling-tampa',
  'bathroom-remodeling': 'bathroom-remodeling-tampa',
  'cabinets':            'kitchen-cabinets-tampa',
  'countertops':         'countertops-tampa',
  'flooring':            'flooring-in-tampa',
}

/**
 * GET /api/pages
 * Returns all active pages (metadata only, no content).
 * On every call:
 *   1. Renames legacy-slug documents to correct URL slugs (idempotent).
 *   2. Auto-seeds any KNOWN_PAGES not yet in the database.
 */
export async function getAllPages(req, res, next) {
  try {
    // ── Step 1: migrate old-slug documents ───────────────────────────────────
    for (const [oldSlug, newSlug] of Object.entries(OLD_SLUG_MAP)) {
      const oldDoc = await Page.findOne({ slug: oldSlug }).lean()
      if (oldDoc) {
        await Page.findOneAndUpdate(
          { slug: oldSlug },
          { $set: { slug: newSlug, content: getDefaultContent(newSlug) } }
        )
      }
    }

    // ── Step 1.5: refresh home page if content version is outdated ───────────
    // This replaces stale DB content (wrong hrefs, old phone, missing sections)
    // with the latest getDefaultContent('home'). Runs once per deployment;
    // _version is preserved through subsequent admin saves via deepMerge.
    const HOME_CONTENT_VERSION = 2
    const homeDoc = await Page.findOne({ slug: 'home' }).lean()
    if (homeDoc && (homeDoc.content?._version ?? 0) < HOME_CONTENT_VERSION) {
      await Page.findOneAndUpdate(
        { slug: 'home' },
        { $set: { content: getDefaultContent('home') } }
      )
    }

    // ── Step 2: auto-seed missing pages ──────────────────────────────────────
    const existing = await Page.find({}).select('slug').lean()
    const existingSlugs = new Set(existing.map((p) => p.slug))

    for (const { slug, title } of KNOWN_PAGES) {
      if (!existingSlugs.has(slug)) {
        await Page.create({
          slug,
          title,
          content: getDefaultContent(slug),
          isActive: true,
        })
      }
    }

    // ── Step 3: return list ───────────────────────────────────────────────────
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

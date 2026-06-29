import Page from '../models/Page.js'
import PageRevision from '../models/PageRevision.js'
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
 *   2. Backfills status:'published' on any page missing the field (one-time, idempotent).
 *   3. Auto-seeds any KNOWN_PAGES not yet in the database.
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
    const HOME_CONTENT_VERSION = 3
    const homeDoc = await Page.findOne({ slug: 'home' }).lean()
    if (homeDoc && (homeDoc.content?._version ?? 0) < HOME_CONTENT_VERSION) {
      await Page.findOneAndUpdate(
        { slug: 'home' },
        { $set: { content: getDefaultContent('home') } }
      )
    }

    // ── Step 1.6: backfill status on pages that pre-date the status field ───
    // Mongoose schema defaults only apply to new documents. Existing DB docs
    // will not have 'status' set. Mark them all as 'published' (idempotent).
    await Page.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'published' } }
    )

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
          status: 'published',
        })
      }
    }

    // ── Step 3: return list ───────────────────────────────────────────────────
    const pages = await Page.find({ isActive: true })
      .select('slug title description status publishedAt updatedAt')
      .sort({ title: 1 })

    res.json({ success: true, data: pages })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/pages/:slug
 * Returns a page with its embedded content JSON.
 * Only serves pages that are NOT explicitly set to 'draft'.
 * Pages missing the status field (existing live pages) are served normally.
 */
export async function getPageBySlug(req, res, next) {
  try {
    const { slug } = req.params

    // Safe filter: { $ne: 'draft' } matches 'published' AND missing-field docs
    const page = await Page.findOne({ slug, status: { $ne: 'draft' } })

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
        status: page.status,
        publishedAt: page.publishedAt,
        updatedAt: page.updatedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/pages/admin/preview/:slug  [PROTECTED]
 * Returns a page regardless of status — used for admin draft preview.
 */
export async function previewPageBySlug(req, res, next) {
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
        status: page.status,
        publishedAt: page.publishedAt,
        updatedAt: page.updatedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/pages/admin/:slug
 * Merge updates into the page's embedded content document.
 * Automatically saves a revision of the current state before updating.
 * No transaction needed — single atomic findOneAndUpdate.
 */
export async function updatePageContent(req, res, next) {
  try {
    const { slug } = req.params
    const { content: updates, title, description, status } = req.body

    // Find the current page
    const page = await Page.findOne({ slug })

    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found.' })
    }

    // ── Save revision of current state before overwriting ────────────────────
    try {
      await PageRevision.create({
        pageId: page._id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        createdBy: req.user?.id || null,
      })

      // Cap at 20 revisions per page — delete oldest if over limit
      const revCount = await PageRevision.countDocuments({ pageId: page._id })
      if (revCount > 20) {
        const toDelete = await PageRevision.find({ pageId: page._id })
          .sort({ createdAt: 1 })
          .limit(revCount - 20)
          .select('_id')
          .lean()
        await PageRevision.deleteMany({ _id: { $in: toDelete.map((r) => r._id) } })
      }
    } catch (revErr) {
      // Revision failure must never block the page save
      console.error('[PageRevision] Failed to save revision:', revErr.message)
    }

    // ── Build update payload ─────────────────────────────────────────────────
    const updateFields = {}

    if (updates != null) {
      updateFields.content = mergePageContent(page.content || {}, updates)
    }

    if (title) updateFields.title = title
    if (description !== undefined) updateFields.description = description

    if (status) {
      updateFields.status = status
      // Set publishedAt when transitioning from draft → published
      if (status === 'published' && page.status !== 'published') {
        updateFields.publishedAt = new Date()
      }
    }

    const updated = await Page.findOneAndUpdate(
      { slug },
      { $set: updateFields },
      { new: true }
    )

    res.json({
      success: true,
      message: 'Page content updated successfully.',
      data: {
        slug,
        content: updated.content,
        status: updated.status,
        publishedAt: updated.publishedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/pages/admin/:slug/revisions  [PROTECTED]
 * Returns list of revisions for a page (metadata only, no content body).
 */
export async function getPageRevisions(req, res, next) {
  try {
    const { slug } = req.params

    const page = await Page.findOne({ slug }).select('_id').lean()
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found.' })
    }

    const revisions = await PageRevision.find({ pageId: page._id })
      .select('title slug createdBy createdAt')
      .sort({ createdAt: -1 })
      .limit(20)

    res.json({ success: true, data: revisions })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/pages/admin/:slug/revisions/:revisionId/restore  [PROTECTED]
 * Restores a page to a previous revision.
 * Saves the current state as a revision before restoring.
 */
export async function restorePageRevision(req, res, next) {
  try {
    const { slug, revisionId } = req.params

    const page = await Page.findOne({ slug })
    if (!page) {
      return res.status(404).json({ success: false, error: 'Page not found.' })
    }

    const revision = await PageRevision.findById(revisionId)
    if (!revision || revision.pageId.toString() !== page._id.toString()) {
      return res.status(404).json({ success: false, error: 'Revision not found.' })
    }

    // Save current state as a revision before overwriting
    try {
      await PageRevision.create({
        pageId: page._id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        createdBy: req.user?.id || null,
      })
    } catch (revErr) {
      console.error('[PageRevision] Failed to save pre-restore revision:', revErr.message)
    }

    // Restore the chosen revision's content
    const updated = await Page.findOneAndUpdate(
      { slug },
      { $set: { content: revision.content } },
      { new: true }
    )

    res.json({
      success: true,
      message: 'Revision restored successfully.',
      data: {
        slug,
        content: updated.content,
        status: updated.status,
        publishedAt: updated.publishedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

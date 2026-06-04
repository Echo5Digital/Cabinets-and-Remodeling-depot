import Gallery from '../models/Gallery.js'
import { deleteImage } from '../services/cloudinary.service.js'

const VALID_CATEGORIES = ['KITCHEN', 'BATHROOM', 'CABINETS', 'COUNTERTOPS', 'FLOORING', 'GENERAL']

/**
 * GET /api/gallery
 */
export async function getAllGallery(req, res, next) {
  try {
    const { category, page = 1, limit = 24 } = req.query

    const filter = { isActive: true }
    if (category && VALID_CATEGORIES.includes(category.toUpperCase())) {
      filter.category = category.toUpperCase()
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [images, total] = await Promise.all([
      Gallery.find(filter)
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Gallery.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: images,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/gallery (admin)
 * Upload one or more images to gallery.
 */
export async function uploadGalleryImages(req, res, next) {
  try {
    const files = req.files || (req.file ? [req.file] : [])

    if (!files.length) {
      return res.status(422).json({ success: false, error: 'At least one image file is required.' })
    }

    const category = (req.body.category || 'GENERAL').toUpperCase()
    const alt = req.body.alt || null
    const caption = req.body.caption || null

    const images = await Gallery.insertMany(
      files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        alt,
        caption,
        category,
        sortOrder: index,
      }))
    )

    res.status(201).json({ success: true, data: images })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/gallery/:id (admin)
 * Update image metadata.
 */
export async function updateGalleryImage(req, res, next) {
  try {
    const { id } = req.params
    const { alt, caption, category, sortOrder, isActive } = req.body

    const image = await Gallery.findById(id)
    if (!image) {
      return res.status(404).json({ success: false, error: 'Image not found.' })
    }

    const updateFields = {}
    if (alt !== undefined) updateFields.alt = alt
    if (caption !== undefined) updateFields.caption = caption
    if (category) updateFields.category = category.toUpperCase()
    if (sortOrder !== undefined) updateFields.sortOrder = Number(sortOrder)
    if (isActive !== undefined) updateFields.isActive = isActive

    const updated = await Gallery.findByIdAndUpdate(id, { $set: updateFields }, { new: true })

    res.json({ success: true, data: updated })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/gallery/:id (admin)
 */
export async function deleteGalleryImage(req, res, next) {
  try {
    const { id } = req.params

    const image = await Gallery.findById(id)
    if (!image) {
      return res.status(404).json({ success: false, error: 'Image not found.' })
    }

    await deleteImage(image.publicId)
    await Gallery.findByIdAndDelete(id)

    res.json({ success: true, message: 'Image deleted.' })
  } catch (err) {
    next(err)
  }
}

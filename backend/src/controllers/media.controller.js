import Gallery from '../models/Gallery.js'

/**
 * POST /api/media/upload
 * Uploads a single image via uploadGeneral middleware, stores it in Gallery DB.
 */
export async function uploadMedia(req, res, next) {
  try {
    if (!req.file) {
      return res.status(422).json({ success: false, error: 'An image file is required.' })
    }

    const image = await Gallery.create({
      url: req.file.path,
      publicId: req.file.filename,
      alt: req.file.originalname.replace(/\.[^.]+$/, ''),
      category: 'GENERAL',
      isActive: true,
    })

    res.status(201).json({
      success: true,
      data: { url: image.url, publicId: image.publicId, id: image.id },
    })
  } catch (err) {
    next(err)
  }
}

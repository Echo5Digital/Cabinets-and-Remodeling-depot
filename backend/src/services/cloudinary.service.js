import cloudinary from '../config/cloudinary.js'

/**
 * Delete an image from Cloudinary by its public_id.
 */
export async function deleteImage(publicId) {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('[Cloudinary] Failed to delete image:', publicId, error.message)
  }
}

/**
 * Delete multiple images from Cloudinary.
 */
export async function deleteImages(publicIds) {
  const validIds = publicIds.filter(Boolean)
  if (!validIds.length) return
  try {
    await cloudinary.api.delete_resources(validIds)
  } catch (error) {
    console.error('[Cloudinary] Failed to delete images:', error.message)
  }
}

/**
 * Get image URL with transformations.
 */
export function getImageUrl(publicId, options = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    quality: 'auto',
    fetch_format: 'auto',
    ...options,
  })
}

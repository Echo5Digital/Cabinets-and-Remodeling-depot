import { Router } from 'express'
import {
  getAllGallery,
  uploadGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/gallery.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { uploadGallery } from '../middleware/upload.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

// Public
router.get('/', getAllGallery)

// Admin
router.post('/', authenticate, requireSuperAdmin, uploadGallery.array('images', 20), uploadGalleryImages)
router.put('/:id', authenticate, requireSuperAdmin, updateGalleryImage)
router.delete('/:id', authenticate, requireSuperAdmin, deleteGalleryImage)

export default router

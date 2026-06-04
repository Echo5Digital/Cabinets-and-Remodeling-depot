import { Router } from 'express'
import {
  getAllGallery,
  uploadGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/gallery.controller.js'
import { authenticate } from '../middleware/auth.js'
import { uploadGallery } from '../middleware/upload.js'

const router = Router()

// Public
router.get('/', getAllGallery)

// Admin
router.post('/', authenticate, uploadGallery.array('images', 20), uploadGalleryImages)
router.put('/:id', authenticate, updateGalleryImage)
router.delete('/:id', authenticate, deleteGalleryImage)

export default router

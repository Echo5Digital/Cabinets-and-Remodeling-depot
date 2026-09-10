import { Router } from 'express'
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  addProjectImage,
  deleteProjectImage,
} from '../controllers/projects.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { uploadProject } from '../middleware/upload.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

// Public
router.get('/', getAllProjects)
router.get('/:slug', getProjectBySlug)

// Admin
router.post('/', authenticate, requireSuperAdmin, uploadProject.single('coverImage'), createProject)
router.put('/:id', authenticate, requireSuperAdmin, uploadProject.single('coverImage'), updateProject)
router.delete('/:id', authenticate, requireSuperAdmin, deleteProject)
router.post('/:id/images', authenticate, requireSuperAdmin, uploadProject.single('image'), addProjectImage)
router.delete('/:id/images/:imageId', authenticate, requireSuperAdmin, deleteProjectImage)

export default router

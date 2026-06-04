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
import { authenticate } from '../middleware/auth.js'
import { uploadProject } from '../middleware/upload.js'

const router = Router()

// Public
router.get('/', getAllProjects)
router.get('/:slug', getProjectBySlug)

// Admin
router.post('/', authenticate, uploadProject.single('coverImage'), createProject)
router.put('/:id', authenticate, uploadProject.single('coverImage'), updateProject)
router.delete('/:id', authenticate, deleteProject)
router.post('/:id/images', authenticate, uploadProject.single('image'), addProjectImage)
router.delete('/:id/images/:imageId', authenticate, deleteProjectImage)

export default router

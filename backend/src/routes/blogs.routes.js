import { Router } from 'express'
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllCategories,
  createCategory,
  deleteCategory,
} from '../controllers/blogs.controller.js'
import { authenticate } from '../middleware/auth.js'
import { uploadBlog } from '../middleware/upload.js'

const router = Router()

// Public
router.get('/', getAllBlogs)
router.get('/categories', getAllCategories)
router.get('/:slug', getBlogBySlug)

// Admin
router.post('/', authenticate, uploadBlog.single('coverImage'), createBlog)
router.put('/:id', authenticate, uploadBlog.single('coverImage'), updateBlog)
router.delete('/:id', authenticate, deleteBlog)

// Categories (admin)
router.post('/categories', authenticate, createCategory)
router.delete('/categories/:id', authenticate, deleteCategory)

export default router

import { Router } from 'express'
import {
  getAllBlogs,
  getBlogById,
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

// Admin — must be before /:slug so the literal "admin" segment is matched first
router.get('/admin/:id', authenticate, getBlogById)

router.get('/:slug', getBlogBySlug)

// Admin
const blogUploadFields = uploadBlog.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'thumbnailImage', maxCount: 1 },
])

router.post('/', authenticate, blogUploadFields, createBlog)
router.put('/:id', authenticate, blogUploadFields, updateBlog)
router.delete('/:id', authenticate, deleteBlog)

// Categories (admin)
router.post('/categories', authenticate, createCategory)
router.delete('/categories/:id', authenticate, deleteCategory)

export default router

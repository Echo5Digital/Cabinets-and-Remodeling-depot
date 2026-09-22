import { Router } from 'express'
import {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  publishBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  getAllCategories,
  createCategory,
  deleteCategory,
} from '../controllers/blogs.controller.js'
import { authenticate, requireRole, verifyPublisherKey } from '../middleware/auth.js'
import { uploadBlog } from '../middleware/upload.js'
import { validate } from '../middleware/validate.js'
import { publishBlogSchema } from '../validation/blog.schema.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

// Public
router.get('/', getAllBlogs)
router.get('/categories', getAllCategories)

// Admin — must be before /:slug so the literal "admin" segment is matched first
router.get('/admin/:id', authenticate, requireSuperAdmin, getBlogById)
router.post('/upload-image', authenticate, requireSuperAdmin, uploadBlog.single('image'), uploadBlogImage)

router.get('/:slug', getBlogBySlug)

// Admin
const blogUploadFields = uploadBlog.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'thumbnailImage', maxCount: 1 },
])

router.post('/', authenticate, requireSuperAdmin, blogUploadFields, createBlog)

// Automated publisher — API-key auth (x-api-key), separate from admin login/reCAPTCHA
router.post('/publish', verifyPublisherKey, validate(publishBlogSchema), publishBlog)
router.put('/:id', authenticate, requireSuperAdmin, blogUploadFields, updateBlog)
router.delete('/:id', authenticate, requireSuperAdmin, deleteBlog)

// Categories (admin)
router.post('/categories', authenticate, requireSuperAdmin, createCategory)
router.delete('/categories/:id', authenticate, requireSuperAdmin, deleteCategory)

export default router

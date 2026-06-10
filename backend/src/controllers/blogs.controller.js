import slugify from 'slugify'
import Blog from '../models/Blog.js'
import BlogCategory from '../models/BlogCategory.js'
import { deleteImage } from '../services/cloudinary.service.js'

function calculateReadTime(body) {
  const wordsPerMinute = 200
  const wordCount = body.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

/**
 * GET /api/blogs
 */
export async function getAllBlogs(req, res, next) {
  try {
    const { page = 1, limit = 9, category, featured, published = 'true' } = req.query

    const filter = {}
    if (published === 'true') filter.isPublished = true
    if (featured === 'true') filter.isFeatured = true

    // Filter by category slug: look up category ObjectId first
    if (category) {
      const cat = await BlogCategory.findOne({ slug: category })
      if (cat) filter.category = cat._id
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select('slug title excerpt coverImage authorName isPublished isFeatured publishedAt readTime category createdAt updatedAt')
        .populate('category', 'id name slug')
        .sort({ isFeatured: -1, publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Blog.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: blogs,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/blogs/admin/:id  (admin — fetch by ObjectId, no isPublished check)
 */
export async function getBlogById(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id).populate('category', 'id name slug')
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' })
    }
    res.json({ success: true, data: blog })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/blogs/:slug
 */
export async function getBlogBySlug(req, res, next) {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('category', 'id name slug')

    if (!blog || !blog.isPublished) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' })
    }

    res.json({ success: true, data: blog })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/blogs (admin)
 */
export async function createBlog(req, res, next) {
  try {
    const data = req.body

    let slug = slugify(data.title, { lower: true, strict: true })
    const existing = await Blog.findOne({ slug })
    if (existing) slug = `${slug}-${Date.now()}`

    const willPublish = data.isPublished === 'true' || data.isPublished === true
    const readTime = calculateReadTime(data.body)

    const blog = await Blog.create({
      slug,
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      coverImage: req.file?.path || null,
      coverPublicId: req.file?.filename || null,
      category: data.categoryId || null,
      authorName: data.authorName || 'Admin',
      isPublished: willPublish,
      isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
      publishedAt: willPublish ? new Date() : null,
      readTime,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
    })

    const populated = await blog.populate('category', 'id name slug')

    res.status(201).json({ success: true, data: populated })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/blogs/:id (admin)
 */
export async function updateBlog(req, res, next) {
  try {
    const { id } = req.params
    const data = req.body

    const existing = await Blog.findById(id)
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' })
    }

    const updateData = {}
    if (data.title) updateData.title = data.title
    if (data.excerpt) updateData.excerpt = data.excerpt
    if (data.body) {
      updateData.body = data.body
      updateData.readTime = calculateReadTime(data.body)
    }
    if (data.categoryId !== undefined) updateData.category = data.categoryId || null
    if (data.authorName) updateData.authorName = data.authorName
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle
    if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription

    if (data.isPublished !== undefined) {
      const willPublish = data.isPublished === 'true' || data.isPublished === true
      updateData.isPublished = willPublish
      if (willPublish && !existing.publishedAt) {
        updateData.publishedAt = new Date()
      } else if (!willPublish) {
        updateData.publishedAt = null
      }
    }
    if (data.isFeatured !== undefined) {
      updateData.isFeatured = data.isFeatured === 'true' || data.isFeatured === true
    }

    if (req.file) {
      if (existing.coverPublicId) await deleteImage(existing.coverPublicId)
      updateData.coverImage = req.file.path
      updateData.coverPublicId = req.file.filename
    }

    const blog = await Blog.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate('category', 'id name slug')

    res.json({ success: true, data: blog })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/blogs/:id (admin)
 */
export async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params

    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found.' })
    }

    if (blog.coverPublicId) await deleteImage(blog.coverPublicId)
    await Blog.findByIdAndDelete(id)

    res.json({ success: true, message: 'Blog post deleted.' })
  } catch (err) {
    next(err)
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getAllCategories(req, res, next) {
  try {
    const categories = await BlogCategory.find().sort({ name: 1 })

    // Count blogs per category
    const counts = await Blog.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])
    const countMap = Object.fromEntries(counts.map((c) => [c._id?.toString(), c.count]))

    const data = categories.map((cat) => ({
      ...cat.toJSON(),
      _count: { blogs: countMap[cat.id] || 0 },
    }))

    res.json({ success: true, data })
  } catch (err) {
    next(err)
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name } = req.body
    const slug = slugify(name, { lower: true, strict: true })
    const category = await BlogCategory.create({ name, slug })
    res.status(201).json({ success: true, data: category })
  } catch (err) {
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params
    const category = await BlogCategory.findByIdAndDelete(id)
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found.' })
    }
    res.json({ success: true, message: 'Category deleted.' })
  } catch (err) {
    next(err)
  }
}

import slugify from 'slugify'
import Project from '../models/Project.js'
import { deleteImage, deleteImages } from '../services/cloudinary.service.js'

/**
 * GET /api/projects
 */
export async function getAllProjects(req, res, next) {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      featured,
      published = 'true',
    } = req.query

    const filter = {}
    if (published === 'true') filter.isPublished = true
    if (category) filter.category = category
    if (featured === 'true') filter.isFeatured = true

    const skip = (Number(page) - 1) * Number(limit)

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .select('slug title category description coverImage location completedAt isFeatured isPublished sortOrder')
        .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Project.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/projects/:slug
 */
export async function getProjectBySlug(req, res, next) {
  try {
    const project = await Project.findOne({ slug: req.params.slug })

    if (!project || !project.isPublished) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }

    // Sort embedded images by sortOrder
    project.images.sort((a, b) => a.sortOrder - b.sortOrder)

    res.json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/projects (admin)
 */
export async function createProject(req, res, next) {
  try {
    const data = req.body

    if (!req.file) {
      return res.status(422).json({ success: false, error: 'Cover image is required.' })
    }

    // Generate unique slug
    let slug = slugify(data.title, { lower: true, strict: true })
    const existing = await Project.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const project = await Project.create({
      slug,
      title: data.title,
      category: data.category,
      description: data.description,
      body: data.body || null,
      coverImage: req.file.path,
      coverPublicId: req.file.filename,
      location: data.location || null,
      completedAt: data.completedAt ? new Date(data.completedAt) : null,
      isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
      isPublished: data.isPublished !== 'false' && data.isPublished !== false,
      sortOrder: Number(data.sortOrder) || 0,
    })

    res.status(201).json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/projects/:id (admin)
 */
export async function updateProject(req, res, next) {
  try {
    const { id } = req.params
    const data = req.body

    const existing = await Project.findById(id)
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }

    const updateData = {}
    if (data.title) updateData.title = data.title
    if (data.category) updateData.category = data.category
    if (data.description) updateData.description = data.description
    if (data.body !== undefined) updateData.body = data.body
    if (data.location !== undefined) updateData.location = data.location
    if (data.completedAt !== undefined) updateData.completedAt = data.completedAt ? new Date(data.completedAt) : null
    if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured === 'true' || data.isFeatured === true
    if (data.isPublished !== undefined) updateData.isPublished = data.isPublished !== 'false' && data.isPublished !== false
    if (data.sortOrder !== undefined) updateData.sortOrder = Number(data.sortOrder)

    // Handle cover image replacement
    if (req.file) {
      if (existing.coverPublicId) {
        await deleteImage(existing.coverPublicId)
      }
      updateData.coverImage = req.file.path
      updateData.coverPublicId = req.file.filename
    }

    const project = await Project.findByIdAndUpdate(id, { $set: updateData }, { new: true })

    res.json({ success: true, data: project })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/projects/:id (admin)
 */
export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params

    const project = await Project.findById(id)

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }

    // Delete all Cloudinary images (cover + embedded images)
    const publicIds = [
      project.coverPublicId,
      ...project.images.map((img) => img.publicId),
    ].filter(Boolean)

    await deleteImages(publicIds)

    // Delete project (embedded images cascade-deleted automatically)
    await Project.findByIdAndDelete(id)

    res.json({ success: true, message: 'Project deleted successfully.' })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/projects/:id/images (admin)
 */
export async function addProjectImage(req, res, next) {
  try {
    const { id } = req.params

    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }

    if (!req.file) {
      return res.status(422).json({ success: false, error: 'Image file is required.' })
    }

    const imgDoc = {
      url: req.file.path,
      publicId: req.file.filename,
      alt: req.body.alt || null,
      type: req.body.type || 'GALLERY',
      sortOrder: Number(req.body.sortOrder) || 0,
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $push: { images: imgDoc } },
      { new: true }
    )

    // Return the newly added image (last in the array)
    const newImage = updated.images[updated.images.length - 1]

    res.status(201).json({ success: true, data: newImage })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/projects/:id/images/:imageId (admin)
 */
export async function deleteProjectImage(req, res, next) {
  try {
    const { id, imageId } = req.params

    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found.' })
    }

    const image = project.images.id(imageId)
    if (!image) {
      return res.status(404).json({ success: false, error: 'Image not found.' })
    }

    await deleteImage(image.publicId)

    await Project.findByIdAndUpdate(
      id,
      { $pull: { images: { _id: imageId } } },
      { new: true }
    )

    res.json({ success: true, message: 'Image deleted.' })
  } catch (err) {
    next(err)
  }
}

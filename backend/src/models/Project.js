import mongoose from 'mongoose'

const opts = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      obj.id = obj._id.toString()
      // Transform embedded image _ids as well
      if (Array.isArray(obj.images)) {
        obj.images = obj.images.map((img) => {
          img.id = img._id?.toString()
          delete img._id
          return img
        })
      }
      delete obj._id
      delete obj.__v
      return obj
    },
  },
}

const projectImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  alt: { type: String, default: null },
  type: { type: String, enum: ['BEFORE', 'AFTER', 'GALLERY', 'FEATURED'], default: 'GALLERY' },
  sortOrder: { type: Number, default: 0 },
})

const PROJECT_CATEGORIES = [
  'KITCHEN_REMODELING',
  'BATHROOM_REMODELING',
  'CUSTOM_CABINETS',
  'KITCHEN_CABINETS',
  'STOCK_CABINETS',
  'QUARTZ_COUNTERTOPS',
  'GRANITE_COUNTERTOPS',
  'FLOORING',
  'OTHER',
]

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    category: { type: String, enum: PROJECT_CATEGORIES, required: true },
    description: { type: String, required: true },
    body: { type: String, default: null },
    coverImage: { type: String, required: true },
    coverPublicId: { type: String, default: null },
    location: { type: String, default: null },
    completedAt: { type: Date, default: null },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    images: [projectImageSchema],
  },
  opts
)

projectSchema.index({ category: 1 })
projectSchema.index({ isPublished: 1 })

export default mongoose.model('Project', projectSchema)

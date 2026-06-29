import mongoose from 'mongoose'

const opts = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, obj) => {
      obj.id = obj._id.toString()
      delete obj._id
      delete obj.__v
      return obj
    },
  },
}

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    // Flexible nested content JSON — replaces the PageContent versioning table
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    // Publishing workflow — defaults to 'published' for backward compatibility
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    publishedAt: { type: Date, default: null },
  },
  opts
)

export default mongoose.model('Page', pageSchema)

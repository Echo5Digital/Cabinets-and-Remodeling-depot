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

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: String, default: null },
    coverPublicId: { type: String, default: null },
    thumbnailImage: { type: String, default: null },
    thumbnailPublicId: { type: String, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory', default: null },
    authorName: { type: String, default: 'Admin' },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    readTime: { type: Number, default: null },
    metaTitle: { type: String, default: null },
    metaDescription: { type: String, default: null },
    schema: { type: String, default: null },
  },
  opts
)

blogSchema.index({ isPublished: 1 })
blogSchema.index({ category: 1 })

export default mongoose.model('Blog', blogSchema)

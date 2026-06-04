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

const gallerySchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, default: null },
    caption: { type: String, default: null },
    category: {
      type: String,
      enum: ['KITCHEN', 'BATHROOM', 'CABINETS', 'COUNTERTOPS', 'FLOORING', 'GENERAL'],
      default: 'GENERAL',
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  opts
)

gallerySchema.index({ category: 1 })

export default mongoose.model('Gallery', gallerySchema)

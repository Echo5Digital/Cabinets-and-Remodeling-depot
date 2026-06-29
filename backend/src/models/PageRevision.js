import mongoose from 'mongoose'

const pageRevisionSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
    },
    title: { type: String, default: null },
    slug: { type: String, default: null },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
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
)

pageRevisionSchema.index({ pageId: 1, createdAt: -1 })

export default mongoose.model('PageRevision', pageRevisionSchema)

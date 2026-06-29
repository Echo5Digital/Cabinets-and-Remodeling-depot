import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    category: { type: String, default: 'general', trim: true },
    // Array of section objects (same shape as Page.content.sections items)
    sections: { type: mongoose.Schema.Types.Mixed, default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
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
)

templateSchema.index({ category: 1 })

export default mongoose.model('Template', templateSchema)

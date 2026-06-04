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

const blogCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
  },
  opts
)

export default mongoose.model('BlogCategory', blogCategorySchema)

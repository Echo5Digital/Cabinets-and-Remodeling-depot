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

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'STAFF'], default: 'STAFF' },
    isActive: { type: Boolean, default: true },

    // Mirrors this account to/from the Cabinet Catalog Platform's own user
    // system so the same person has one login story across both admin panels.
    catalogPlatformUserId: { type: String, default: null },
    catalogSyncStatus: { type: String, enum: ['SYNCED', 'PENDING', 'FAILED', null], default: null },
    catalogSyncError: { type: String, default: null },
  },
  opts
)

export default mongoose.model('User', userSchema)

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

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: null },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    service: { type: String, default: null },
    subject: { type: String, default: null },
    message: { type: String, required: true },
    source: { type: String, default: 'website' },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST'],
      default: 'NEW',
    },
    notes: { type: String, default: null },
    respondedAt: { type: Date, default: null },
  },
  opts
)

leadSchema.index({ status: 1 })
leadSchema.index({ createdAt: -1 })

export default mongoose.model('Lead', leadSchema)

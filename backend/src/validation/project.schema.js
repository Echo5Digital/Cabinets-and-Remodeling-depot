import Joi from 'joi'

const VALID_CATEGORIES = [
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

export const createProjectSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  category: Joi.string()
    .valid(...VALID_CATEGORIES)
    .required(),
  description: Joi.string().min(10).max(1000).required(),
  body: Joi.string().max(10000).allow('', null),
  location: Joi.string().max(200).allow('', null),
  completedAt: Joi.date().iso().allow(null),
  isFeatured: Joi.boolean().default(false),
  isPublished: Joi.boolean().default(true),
  sortOrder: Joi.number().integer().min(0).default(0),
})

export const updateProjectSchema = createProjectSchema.fork(
  ['title', 'category', 'description'],
  (schema) => schema.optional()
)

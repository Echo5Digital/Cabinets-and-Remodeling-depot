import Joi from 'joi'

export const createBlogSchema = Joi.object({
  title: Joi.string().min(5).max(300).required(),
  excerpt: Joi.string().min(10).max(500).required(),
  body: Joi.string().min(50).required(),
  categoryId: Joi.string().allow('', null),
  authorName: Joi.string().max(100).default('Admin'),
  isPublished: Joi.boolean().default(false),
  isFeatured: Joi.boolean().default(false),
  metaTitle: Joi.string().max(70).allow('', null),
  metaDescription: Joi.string().max(160).allow('', null),
})

export const updateBlogSchema = createBlogSchema.fork(
  ['title', 'excerpt', 'body'],
  (schema) => schema.optional()
)

export const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
})

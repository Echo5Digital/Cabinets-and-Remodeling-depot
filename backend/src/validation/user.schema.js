import Joi from 'joi'

export const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters.',
    'any.required': 'Password is required.',
  }),
  name: Joi.string().trim().min(1).required().messages({
    'any.required': 'Name is required.',
  }),
  role: Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'STAFF').default('STAFF'),
})

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(1),
  password: Joi.string().min(6).messages({
    'string.min': 'Password must be at least 6 characters.',
  }),
  role: Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'STAFF'),
  isActive: Joi.boolean(),
}).min(1)

export const retrySyncUserSchema = Joi.object({
  password: Joi.string().min(6).messages({
    'string.min': 'Password must be at least 6 characters.',
  }),
})

// Inbound payload from the Cabinet Catalog Platform's user-change webhook.
export const catalogUserWebhookSchema = Joi.object({
  event: Joi.string().valid('user.created', 'user.updated', 'user.deleted').required(),
  catalogPlatformUserId: Joi.string().required(),
  email: Joi.string().email().when('event', { is: 'user.deleted', then: Joi.optional(), otherwise: Joi.required() }),
  name: Joi.string().trim().min(1).optional(),
  role: Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'STAFF').optional(),
  isActive: Joi.boolean().optional(),
})

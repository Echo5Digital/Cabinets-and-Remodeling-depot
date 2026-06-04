import Joi from 'joi'

export const createLeadSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required().messages({
    'any.required': 'First name is required.',
    'string.min': 'First name is required.',
  }),
  lastName: Joi.string().min(1).max(100).required().messages({
    'any.required': 'Last name is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  phone: Joi.string()
    .pattern(/^[+\d\s\-().]{7,20}$/)
    .allow('', null)
    .messages({ 'string.pattern.base': 'Please provide a valid phone number.' }),
  service: Joi.string().max(200).allow('', null),
  message: Joi.string().min(10).max(3000).required().messages({
    'string.min': 'Message must be at least 10 characters.',
    'any.required': 'Message is required.',
  }),
  source: Joi.string().max(200).allow('', null),
})

export const updateLeadSchema = Joi.object({
  status: Joi.string()
    .valid('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST')
    .optional(),
  notes: Joi.string().max(5000).allow('', null),
  respondedAt: Joi.date().iso().allow(null),
})

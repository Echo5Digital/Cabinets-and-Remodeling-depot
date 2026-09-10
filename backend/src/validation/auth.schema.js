import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters.',
    'any.required': 'Password is required.',
  }),
  recaptchaToken: Joi.string().required().messages({
    'any.required': 'Please complete the reCAPTCHA challenge.',
    'string.empty': 'Please complete the reCAPTCHA challenge.',
  }),
})

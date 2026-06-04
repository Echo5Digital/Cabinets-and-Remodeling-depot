import Joi from 'joi'

const heroSchema = Joi.object({
  title: Joi.string().max(300).allow(''),
  subtitle: Joi.string().max(600).allow(''),
  backgroundImage: Joi.string().allow(''),
  ctaText: Joi.string().max(100).allow(''),
  ctaLink: Joi.string().max(300).allow(''),
  secondaryCtaText: Joi.string().max(100).allow(''),
  secondaryCtaLink: Joi.string().max(300).allow(''),
}).unknown(true)

const faqItemSchema = Joi.object({
  question: Joi.string().max(500).required(),
  answer: Joi.string().max(3000).required(),
})

const seoSchema = Joi.object({
  metaTitle: Joi.string().max(70).allow(''),
  metaDescription: Joi.string().max(160).allow(''),
  ogImage: Joi.string().allow(''),
  keywords: Joi.string().max(500).allow(''),
}).unknown(true)

const ctaSchema = Joi.object({
  heading: Joi.string().max(300).allow(''),
  subheading: Joi.string().max(600).allow(''),
  buttonText: Joi.string().max(100).allow(''),
  buttonLink: Joi.string().max(300).allow(''),
  backgroundImage: Joi.string().allow(''),
}).unknown(true)

export const updatePageContentSchema = Joi.object({
  title: Joi.string().max(200),
  description: Joi.string().max(500).allow(''),
  content: Joi.object({
    hero: heroSchema,
    faq: Joi.array().items(faqItemSchema),
    cta: ctaSchema,
    seo: seoSchema,
    sections: Joi.array().items(Joi.object().unknown(true)),
  })
    .unknown(true)
    .required(),
})

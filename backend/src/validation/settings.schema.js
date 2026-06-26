import Joi from 'joi'

export const updateSettingsSchema = Joi.object({
  settings: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required(),
        value: Joi.alternatives().try(
          Joi.string().allow(''),
          Joi.number(),
          Joi.boolean(),
          Joi.object(),
          Joi.array()
        ).allow(null).optional(),
      })
    )
    .required(),
})

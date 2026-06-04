/**
 * Joi validation middleware factory.
 * Usage: validate(schema) returns an Express middleware.
 */
export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const data = source === 'body' ? req.body : source === 'params' ? req.params : req.query
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const messages = error.details.map((d) => d.message)
      return res.status(422).json({
        success: false,
        error: 'Validation failed',
        details: messages,
      })
    }

    // Replace with sanitized value
    if (source === 'body') req.body = value
    else if (source === 'params') req.params = value
    else req.query = value

    next()
  }
}

const Joi = require('@hapi/joi')

const schema = Joi.object.keys({
  name: Joi.string().trim().alphanum().max(50).required()
})

module.exports = locationValidator => location => Joi.validate(location, schema)



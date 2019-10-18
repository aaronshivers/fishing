const Joi = require('@hapi/joi')

module.exports = location => {

  const schema = Joi.object().keys({
    name: Joi.string().required().trim().max(50),
    description: Joi.string().required().max(500),
    website: Joi.string().uri(),
    phone: Joi.string().max(20),
    email: Joi.string().email(),
    address: Joi.string().required(),
    fish: Joi.array().items(Joi.string()).required(),
    camping: Joi.boolean(),
    boatLanding: Joi.boolean(),
    fishingDock: Joi.boolean(),
    disabledAccessible: Joi.boolean(),
  })
  return schema.validate(location)
}

const Joi = require('@hapi/joi')

const locationValidator = async location => {

  const schema = Joi.string()

  schema.validate(location.name)

  try {
    console.log('asdfasdfasdfasdfadsfadsfasdf')
    return await schema.validateAsync(location.name)
  } catch (e) {
    console.log(e.message)
    return e
  }
}

module.exports = locationValidator

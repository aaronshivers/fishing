const ErrorResponse = require('../utils/errorResponse')

module.exports = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // log error to console
  console.log(err)

  // invalid mongoDB ObjectId
  if (err.name === 'CastError') {
    const message = `Invalid ObjectId: ${ err.value }`
    error = new ErrorResponse(message, 404)
  }

  // duplicate mongoDB key
  if (err.code === 11000) {
    const message = `Duplicate field entered`
    error = new ErrorResponse(message, 400)
  }

  // mongoDB validation error
  if (err.name === 'ValidationError') {
    const message = err.details[0].message
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  })
}

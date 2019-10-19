const ErrorResponse = require('../utils/errorResponse')

module.exports = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // log error to console
  console.log(err.stack.red)

  // invalid mongoDB ObjectId
  if (err.name === 'CastError') {
    const message = `Invalid ObjectId: ${ err.value }`
    error = new ErrorResponse(message, 404)
  }


  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  })
}

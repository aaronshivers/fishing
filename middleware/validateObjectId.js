const { ObjectId } = require('mongodb')

// Validate ObjectId
module.exports = validateObjectId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, error: 'Invalid ID' })
  }

  next()
}

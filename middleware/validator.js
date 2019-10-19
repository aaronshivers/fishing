module.exports = validator => (req, res, next) => {
  const { error } = validator(req.body)
  return next(error)
}

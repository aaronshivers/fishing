module.exports = validator => (req, res, next) => {
    console.log('hi')
    const { error } = validator(req.body)
console.log(req.body)
    if (error) {
      return res.status(400).render(
        'error', { success: false, error: error.details[0].message}
        )
    }
    next()
}

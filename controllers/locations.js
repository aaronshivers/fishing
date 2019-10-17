// @desc    Get all locations
// @route   GET /api/v1/locations
// @access  Public
exports.getLocations = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: {
        msg: 'Show all locations',
      },
    })
}

// @desc    Get single location
// @route   GET /api/v1/locations/:id
// @access  Public
exports.getLocation = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: {
        msg: `get location with id: ${ req.params.id }`,
      },
    })
}

// @desc    Create new location
// @route   POST /api/v1/locations
// @access  Private
exports.createLocation = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: {
        msg: 'create new location',
      },
    })
}

// @desc    Update location
// @route   PATCH /api/v1/locations/:id
// @access  Private
exports.updateLocation = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: {
        msg: `update location ${ req.params.id }`,
      },
    })
}

// @desc    Delete location
// @route   DELETE /api/v1/locations/:id
// @access  Private
exports.deleteLocation = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: {
        msg: `delete location ${ req.params.id }`,
      },
    })
}

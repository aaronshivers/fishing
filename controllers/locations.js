const Location = require('../models/Locations')

// @desc    Get all locations
// @route   GET /api/v1/locations
// @access  Public
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find()

    res.status(200).json({ success: true, data: locations })
  } catch (e) {
    res.status(400).json({ success: false })
  }
}

// @desc    Get single location
// @route   GET /api/v1/locations/:id
// @access  Public
exports.getLocation = async (req, res, next) => {

  try {

    // get location id
    const { id } = req.params

    // get location by id
    const location = await Location.findById(id)

    // return 404 if location is not found
    if (!location) return res.status(404).json({ success: false })

    // return location data
    res.status(200).json({ success: true, data: location })

  } catch (e) {

    // return 400 on error
    res.status(400).json({ success: false })
  }

}

// @desc    Create new location
// @route   POST /api/v1/locations
// @access  Private
exports.createLocation = async (req, res, next) => {
  try {
    const location = await Location.create(req.body)

    res.status(201).json({
      success: true,
      data: location,
    })
  } catch (e) {
    res.status(400).json({ success: false })
  }

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

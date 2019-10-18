const Location = require('../models/Locations')

// @desc    Get all locations
// @route   GET /api/v1/locations
// @access  Public
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find()

    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    })
  } catch (e) {
    res.status(400).json({ success: false })
  }
}

// @desc    Get single location
// @route   GET /api/v1/locations/:id
// @access  Public
exports.getLocation = async (req, res) => {

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
exports.createLocation = async (req, res) => {

  try {
    const location = await Location.create(req.body)

    res.status(201).json({
      success: true,
      data: location,
    })
  } catch (e) {

    // return 400 on error
    res.status(400).json({ success: false })
  }
}

// @desc    Update location
// @route   PATCH /api/v1/locations/:id
// @access  Private
exports.updateLocation = async (req, res) => {

  try {
    // get location id
    const _id = req.params.id

    // get update data
    const data = req.body

    // update location
    const location = await Location.findByIdAndUpdate(_id, data)

    // return 400 if location was not updated
    if (!location) return res.status(400).json({ success: false })

    // return data
    return res.status(200).json({ success: true, location })

  } catch (e) {

    // return 400 on error
    res.status(400).json({ success: false })
  }
}

// @desc    Delete location
// @route   DELETE /api/v1/locations/:id
// @access  Private
exports.deleteLocation = async (req, res) => {

  try {
    // get location id
    const { id } = req.params

    // update location
    const location = await Location.findByIdAndDelete(id)

    // return 400 if location was not found
    if (!location) return res.status(400).json({ success: false })

    // return data
    return res.status(200).json({ success: true, location })

  } catch (e) {

    // return 400 on error
    res.status(400).json({ success: false })
  }
}

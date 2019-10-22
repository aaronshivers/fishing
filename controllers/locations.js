const ErrorResponse = require('../utils/errorResponse')
const geoCoder = require('../utils/geoCoder')
const Location = require('../models/Locations')

// @desc    Get all locations
// @route   GET /api/v1/locations
// @access  Public
exports.getLocations = async (req, res, next) => {
  const queryString = JSON
    .stringify(req.query)
    .toLowerCase()
    .replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${ match }`)

  const locations = await Location.find(JSON.parse(queryString))

  res.status(200).json({
    success: true,
    count: locations.length,
    data: locations,
  })
}

// @desc    Get single location
// @route   GET /api/v1/locations/:id
// @access  Public
exports.getLocation = async (req, res, next) => {
  // get location id
  const { id } = req.params

  // get location by id
  const location = await Location.findById(id)

  // return 404 if location is not found
  if (!location) {
    return next(
      new ErrorResponse(`Location not found with id of ${ id }`, 404),
    )
  }

  // return location data
  return res.status(200).json({ success: true, data: location })
}

// @desc    Create new location
// @route   POST /api/v1/locations
// @access  Private
exports.createLocation = async (req, res, next) => {
  const location = await Location.create(req.body)

  res.status(201).json({
    success: true,
    data: location,
  })
}

// @desc    Update location
// @route   PATCH /api/v1/locations/:id
// @access  Private
exports.updateLocation = async (req, res, next) => {

  // get location id
  const _id = req.params.id

  // get update data
  const data = req.body

  // update location
  const location = await Location.findByIdAndUpdate(_id, data)

  // return 400 if location was not updated

  // return 404 if location is not found
  if (!location) {
    return next(
      new ErrorResponse(`Location not found with id of ${ id }`, 404),
    )
  }

  // return data
  return res.status(200).json({ success: true, location })
}

// @desc    Delete location
// @route   DELETE /api/v1/locations/:id
// @access  Private
exports.deleteLocation = async (req, res, next) => {

  // get location id
  const { id } = req.params

  // update location
  const location = await Location.findByIdAndDelete(id)

  // return 404 if location is not found
  if (!location) {
    return next(
      new ErrorResponse(`Location not found with id of ${ id }`, 404),
    )
  }

  // return data
  return res.status(200).json({ success: true, location })
}

// @desc    get locations within a radius
// @route   GET /api/v1/locations/radius/:zipcode/:distance
// @access  Private
exports.getLocationsInRadius = async (req, res, next) => {

  // get zipcode and distance
  const { zipcode, distance } = req.params

  // update location
  const location = await geoCoder(zipcode)
  const { latitude, longitude } = location

  const radius = distance / 3963.2

  const area = {
    center: [ longitude, latitude ],
    radius,
    unique: true,
    spherical: true,
  }
  const locations = await Location.where('location').within().circle(area)

  // return data
  return res.status(200).json({
    success: true,
    count: locations.length,
    locations,
  })
}

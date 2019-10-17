const express = require('express')
const router = express.Router()
const {
  getLocation,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locations')

router
  .route('/')
  .get(getLocations)
  .post(createLocation)

router
  .route('/:id')
  .get(getLocation)
  .patch(updateLocation)
  .delete(deleteLocation)

module.exports = router

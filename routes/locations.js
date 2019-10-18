const express = require('express')
const router = express.Router()
const validateObjectId = require('../middleware/validateObjectId')
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
  .all('/:id', validateObjectId)
  .route('/:id')
  .get(getLocation)
  .patch(updateLocation)
  .delete(deleteLocation)

module.exports = router

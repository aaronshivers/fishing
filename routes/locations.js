const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator')
const validateObjectId = require('../middleware/validateObjectId')
const validateLocation = require('../middleware/validateLocation')
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
  .post(validator(validateLocation), createLocation)

router
  // .all('/:id', validateObjectId)
  .route('/:id')
  .get(getLocation)
  .patch(validator(validateLocation), updateLocation)
  .delete(deleteLocation)


module.exports = router

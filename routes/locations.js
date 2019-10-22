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
  getLocationsInRadius,
} = require('../controllers/locations')
const asyncHandler = require('../middleware/async')

router.route('/radius/:zipcode/:distance').get(getLocationsInRadius)

router
  .route('/')
  .get(asyncHandler(getLocations))
  .post(validator(validateLocation), asyncHandler(createLocation))

router
// .all('/:id', validateObjectId)
  .route('/:id')
  .get(asyncHandler(getLocation))
  .patch(validator(validateLocation), asyncHandler(updateLocation))
  .delete(asyncHandler(deleteLocation))


module.exports = router

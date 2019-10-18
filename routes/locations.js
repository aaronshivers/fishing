const express = require('express')
const router = express.Router()
const {ObjectId} = require('mongodb')
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
  .post(createLocation)

// router
//   .param('id', (req, res, next, id) => {
//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, error: 'Invalid ID' })
//     }
//     next()
//   })

// router
//   .param('location', (req, res, next, location) => {
//     console.log(req.params)
//     next()
//   })

router
  // .all('/:id', validateObjectId)
  .all('/:id', validateObjectId, validator(validateLocation))
  .route('/:id')
  .get(getLocation)
  .patch(updateLocation)
  .delete(deleteLocation)


module.exports = router

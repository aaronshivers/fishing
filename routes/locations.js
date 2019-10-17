const express = require('express')
const router = express.Router()

// GET /
router.get('/', ((req, res) => {
    res
      .status(200)
      .json({
        success: true,
        data: {
          msg: 'Show all locations',
        },
      })
  }),
)

// GET /:id
router.patch('/:id', ((req, res) => {
    res
      .status(200)
      .json({
        success: true,
        data: {
          msg: `get location with id: ${ req.params.id }`,
        },
      })
  }),
)

// POST /
router.post('/', ((req, res) => {
    res
      .status(200)
      .json({
        success: true,
        data: {
          msg: 'create new location',
        },
      })
  }),
)

// PATCH /
router.patch('/:id', ((req, res) => {
    res
      .status(200)
      .json({
        success: true,
        data: {
          msg: `update location ${ req.params.id }`,
        },
      })
  }),
)

// DELETE /:id
router.post('/:id', ((req, res) => {
    res
      .status(200)
      .json({
        success: true,
        data: {
          msg: `delete location with id: ${ req.params.id }`,
        },
      })
  }),
)

module.exports = router

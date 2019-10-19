require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const connectDB = require('./db/mongoose')
const errorHandler = require('./middleware/error')
require('colors')

const app = express()
const PORT = process.env.PORT || 3000
const environment = process.env.NODE_ENV

const locationsRoutes = require('./routes/locations')

// connect to database
connectDB()

// body parser
app.use(express.json())

// log during development mode
if (environment === 'development') app.use(morgan('dev'))

// mount locations routes
app.use('/api/v1/locations', locationsRoutes)
app.use(errorHandler)

// connect to server
const server = app.listen(
  PORT, () => {
    console.log(
      `Server running in ${ environment } mode on port ${ PORT }`.yellow.bold,
    )
  },
)

// handle rejection errors
process.on('unhandledRejection', (error) => {
  console.log(`Error: ${ error.message }`.red)
  server.close(() => process.exit(1))
})

module.exports = {server}

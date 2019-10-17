require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const connectDB = require('./db/mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const environment = process.env.NODE_ENV

const locationsRoutes = require('./routes/locations')

// log during development mode
if (environment === 'development') app.use(morgan('dev'))

// connect to database
connectDB()

// middleware
app.use('/api/v1/locations', locationsRoutes)

// connect to server
const server = app.listen(
  PORT, () => {
    console.log(`Server running in ${ environment } mode on port ${ PORT }`)
  },
)

process.on('unhandledRejection', (error) => {
  console.log(`Error: ${ error.message }`)
  server.close(() => process.exit(1))
})

require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3000
const environment = process.env.NODE_ENV

const locationsRoutes = require('./routes/locations')

if (environment === 'development') app.use(morgan('dev'))

app.use('/api/v1/locations', locationsRoutes)

app.listen(
  PORT, () => {
    console.log(`Server running in ${ environment } mode on port ${ PORT }`)
  }
)

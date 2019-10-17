require('dotenv').config()

const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

const locationsRoutes = require('./routes/locations')

app.use('/api/v1/locations', locationsRoutes)

app.listen(
  PORT, () => {
    console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`)
  }
)

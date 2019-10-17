require('dotenv').config()

const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`),
)

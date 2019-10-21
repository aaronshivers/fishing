require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = require('./db/mongoose')

// load models
const Location = require('./models/Locations')

// connect to DB
connectDB()

// read JSON files
const locations = JSON.parse(fs.readFileSync(`${ __dirname }/_data/locations.json`, 'utf-8'))

// import into db
const importData = async () => {
  try {
    await Location.create(locations)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (e) {
    console.error(e)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Location.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (e) {
    console.error(e)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}

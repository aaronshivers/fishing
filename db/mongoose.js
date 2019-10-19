const mongoose = require('mongoose')

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_CLUSTER,
  NODE_ENV
} = process.env

const uri = `mongodb+srv://${ MONGO_CLUSTER }/`
const encodedUri = encodeURI(uri)

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  retryWrites: true,
  user: MONGO_USER,
  pass: MONGO_PASS,
  dbName: NODE_ENV
}

module.exports = async () => {
  const conn = await mongoose.connect(encodedUri, options)
  console.log(`MongoDB Connected: ${ conn.connection.host }`.cyan.underline.bold)
}

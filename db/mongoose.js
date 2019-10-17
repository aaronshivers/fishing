const mongoose = require('mongoose')

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_CLUSTER,
  MONGO_COLLECTION,
} = process.env
const encodedPass = encodeURIComponent(MONGO_PASS)

const url = `mongodb+srv://${ MONGO_USER }:${ encodedPass }@${ MONGO_CLUSTER }/${ MONGO_COLLECTION }?retryWrites=true&w=majority`

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

module.exports = async () => {
  const conn = await mongoose.connect(url, options)
  console.log(`MongoDB Connected: ${ conn.connection.host }`)
}

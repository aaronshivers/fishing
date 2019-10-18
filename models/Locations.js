const mongoose = require('mongoose')

module.exports = LocationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [ true, 'Please add a name' ],
      unique: true,
      trim: true,
      maxlength: [ 50, 'Name must not exceed 50 characters' ],
    },
    slug: String,
    description: {
      type: String,
      required: [ true, 'Please add a description' ],
      maxlength: [ 500, 'Description must not exceed 500 characters' ],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    phone: {
      type: String,
      maxlength: [ 20, 'Phone number can not be longer than 20 characters' ],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    address: {
      type: String,
      required: [ true, 'Please add an address' ],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: [ 'Point' ],
      },
      coordinates: {
        type: [ Number ],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    fish: {
      // Array of strings
      type: [ String ],
      required: true,
      enum: [
        'Black Bass',
        'Catfish',
        'Crappie',
        'Sunfish',
        'Walleye/Sauger',
        'White Bass',
        'Other',
      ],
    },
    averageRating: {
      type: Number,
      min: [ 1, 'Rating must be at least 1' ],
      max: [ 10, 'Rating must can not be more than 10' ],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    camping: {
      type: Boolean,
      default: false,
    },
    boatLanding: {
      type: Boolean,
      default: false,
    },
    fishingDock: {
      type: Boolean,
      default: false,
    },
    disabledAccessible: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
)

module.exports = mongoose.model('Location', LocationSchema)


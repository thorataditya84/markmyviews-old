const mongoose = require('mongoose')

var Schema = mongoose.Schema

var ReviewSchema = new Schema({
  Username: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  Rating: {
    type: String,
    required: true
  },
  Review: {
    type: String,
    required: false
  }
})

var ReviewDB = mongoose.model('ReviewDB', ReviewSchema)
module.exports = { ReviewDB }

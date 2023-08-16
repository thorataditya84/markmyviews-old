const mongoose = require('mongoose')

var Schema = mongoose.Schema

var BookSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  Rating: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  }
})

var BookInfo = mongoose.model('BookInfo', BookSchema)
module.exports = { BookInfo }

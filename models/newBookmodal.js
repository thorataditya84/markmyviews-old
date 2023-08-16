const mongoose = require('mongoose')

var Schema = mongoose.Schema

var newBookSchema = new Schema({
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
    required: false
  },
  Category: {
    type: String,
    required: false
  },
  Description: {
    type: String,
    required: false
  }
})

var newBookInfo = mongoose.model('newBookInfo', newBookSchema)
module.exports = { newBookInfo }

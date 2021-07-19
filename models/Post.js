// models should be uppercase
const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data: Object,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
},{collection: 'Test dbase'})


module.exports = mongoose.model('Any name here', PostSchema)
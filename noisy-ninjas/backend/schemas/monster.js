const mongoose = require('mongoose')

var Schema = mongoose.Schema

var Monster = new Schema({
  displayName: String,
  health: { type: Number, default: 5 },
  skin: { type: String, default: 'screamer' },
  chat: { type: String, default: '' },
  x: { type: Number, default: 20 },
  y: { type: Number, default: 19 },
})

module.exports = mongoose.model('Monster', Monster)

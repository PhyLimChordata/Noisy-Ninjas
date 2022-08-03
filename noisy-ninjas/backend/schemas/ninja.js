const mongoose = require('mongoose')

var Schema = mongoose.Schema

var Ninja = new Schema({
  displayName: String,
  health: { type: Number, default: 5 },
  skin: { type: String, default: 'black-ninja' },
  chat: { type: String, default: '' },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
})

module.exports = mongoose.model('Ninja', Ninja)

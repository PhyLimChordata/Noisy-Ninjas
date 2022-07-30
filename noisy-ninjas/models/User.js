const mongoose = require('mongoose')

var Schema = mongoose.Schema

var User = new Schema({
  googleID: String,
  displayName: String,
  imageURL: String,
  points: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  beltRank: { type: String, default: "#FFFFFF"},
  hash: String,
})

module.exports = mongoose.model('User', User)

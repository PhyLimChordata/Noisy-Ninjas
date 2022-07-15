const mongoose = require("mongoose")

var Schema = mongoose.Schema;

var User = new Schema({
googleID: String,
displayName: String,
imageURL: String,
points: Number,
hash: String
});

module.exports = mongoose.model("User", User)
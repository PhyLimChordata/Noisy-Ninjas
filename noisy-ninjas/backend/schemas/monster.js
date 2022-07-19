const mongoose = require("mongoose")

var Schema = mongoose.Schema;

var Monster = new Schema({
displayName: String,
health: Number,
x: Number,
y: Number,
});

module.exports = mongoose.model("Monster", Monster)
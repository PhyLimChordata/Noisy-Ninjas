const mongoose = require("mongoose")

var Schema = mongoose.Schema;

var Match = new Schema({
matchMap: Schema.Types.Mixed,
matchNinjas: Schema.Types.Mixed,
matchMonsters: Schema.Types.Mixed,
});

module.exports = mongoose.model("Match", Match)
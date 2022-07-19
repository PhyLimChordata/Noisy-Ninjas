const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema(
	{
    map: {type: Schema.Types.Mixed,
    default: {
      "cor0,0": {             
        type: Schema.Types.Mixed,
        default: { 
           type: ["normal"],
           color: "#3D8B00",
           players: []
       }
    }
  }
  },
},
{
  timestamps: true,
},
{ minimize: false },
);

const map = mongoose.model('map', MapSchema);
module.exports = map;

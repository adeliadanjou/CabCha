const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Eater = require("./Eater");
const Restaurant = require("./Restaurant");


const groupSchema = new Schema({

  leader: { type: Schema.Types.ObjectId, ref: "Eater" },

  eaters: [{ type: Schema.Types.ObjectId, ref: "Eater" }],

  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" }

});

module.exports = mongoose.model('Group', groupSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const groupSchema = new Schema({

  leader: String ,
  eaters: Array,
  restaurant: String

});

module.exports = mongoose.model('Group', groupSchema);
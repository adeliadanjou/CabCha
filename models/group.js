const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  leader: {
    type: String,
    required: true
  },

  eaters: {
    type: [],
    required: true,
  },

  restaurant: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('Group', groupSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eaterSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
});

module.exports = mongoose.model('Eater', eaterSchema);
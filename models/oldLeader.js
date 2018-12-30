const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const oldLeaderSchema = new Schema({

  leaders: Array,

});

module.exports = mongoose.model('OldLeader', oldLeaderSchema);
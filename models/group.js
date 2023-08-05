const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
});

module.exports = mongoose.model('Group', groupSchema);
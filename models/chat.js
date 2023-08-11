const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatName: {
    type: String, 
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isGroup: {
    type: Boolean,
    default: false
  },
  latestMessage: {
    type: Schema.Types.ObjectId,
    ref: "Message"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);
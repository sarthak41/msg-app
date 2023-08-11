const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	content: {
		type: String,
		required: true,
		maxLength: 1000
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	chat: {
		type: Schema.Types.ObjectId,
		ref: "Chat",
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);
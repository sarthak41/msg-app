const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	timestamp: {
		type: Date,
		required: true
	},
	content: {
		type: String,
		required: true,
		maxLength: 1000
	},
	fromUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	toUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	toGroup: {
		type: Schema.Types.ObjectId,
		ref: 'Group'
	}
});

messageSchema.path('toUser').validate(() => {
	return (this.toUser || this.toGroup) && !(this.toUser && this.toGroup);
}, 'Either toUser or toGroup must be present, but not both');

module.exports = mongoose.model("Message", messageSchema);
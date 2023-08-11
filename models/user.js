const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		maxLength: 50
	},
	username: {
		type: String,
		required: true,
		maxLength: 50,
	},
	password: {
		type: String,
		required: true
	},
	bio: {
		type: String,
		maxLength: 1000
	}
});

module.exports = mongoose.model("User", userSchema);
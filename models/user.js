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
	},
	color: {
		type: String,
		maxLength: 20,
		default: "white"
	},
	profilePicture: {
		type: String,
		default: "https://i0.wp.com/upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
	},
	pfpId: {
		type: String
	}
});

module.exports = mongoose.model("User", userSchema);
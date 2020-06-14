const mongoose = require("mongoose");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	birthdate: {
		type: String,
	},
});

module.exports = User;

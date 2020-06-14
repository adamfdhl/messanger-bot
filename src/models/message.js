const mongoose = require("mongoose");

const Message = mongoose.model("Message", {
	user: {
		type: String,
		required: true,
		index: true,
	},
	message: {
		type: String,
	},
});

module.exports = Message;

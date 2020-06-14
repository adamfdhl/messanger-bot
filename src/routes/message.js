const express = require("express");
const Message = require("../models/message");

const router = express.Router();

router.post("/messages", async (req, res) => {
	const message = new Message(req.body);
	try {
		await message.save();
		res.status(201).send(message);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/messages", async (req, res) => {
	try {
		const messages = await Message.find({});
		res.send(messages);
	} catch (e) {
		res.status(500).send();
	}
});

router.delete("/messages/:id", async (req, res) => {
	try {
		const message = await Message.findByIdAndDelete(req.params.id);
		if (!message) {
			return res.status(404).send();
		}
		res.send(message);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;

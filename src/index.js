const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hi I'm a chatbot");
});

// Facebook
app.get("/webhook/", (req, res) => {
	if (req.query["hub.verify_token"] === "birthday-gan") {
		res.send(req.query["hub.challenge"]);
	}
	res.send("Wrong token");
});

app.post("/webhook/", (req, res) => {
	let messaging_events = req.body.entry[0].messaging_events;
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i];
		let sender = event.sender.id;
		if (event.message && event.message.text) {
			let text = event.message.text;
			sendText(sender, "Text echo: " + text.substring(0, 100));
		}
	}
	res.sendStatus(200);
});

const sendText = (sender, text) => {
	let messageData = { text: text };
	request(
		{
			url: "https://graph.facebook.com/v7.0/me/message",
			qs: { access_token: process.env.ACCESS_TOKEN },
			method: "POST",
			json: {
				receipt: { id: sender },
				message: messageData,
			},
		},
		(error, response) => {
			if (error) {
				console.log("sending error: ", error);
			} else if (response.body.error) {
				console.log("response body error: ", response.body.error);
			}
		}
	);
};

app.listen(app.get("port"), () => {
	console.log(`Server running`);
});

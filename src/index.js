const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
require("./db/mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(messageRouter);
app.set("port", process.env.PORT || 5000);

let token = process.env.ACCESS_TOKEN;

let state = 0;
let userData = {};

app.get("/", (req, res) => {
	res.send("CHATBOT LIVE");
});

// Facebook
app.get("/webhook/", (req, res) => {
	if (req.query["hub.verify_token"] === "birthday-gan") {
		res.send(req.query["hub.challenge"]);
	}
	res.send("Wrong token");
});

app.post("/webhook/", (req, res) => {
	console.log("req.body: \n", req.body);
	let messaging_events = req.body.entry[0].messaging;
	console.log(messaging_events);
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i];
		let sender = event.sender.id;
		if (event.message && event.message.text) {
			let text = event.message.text;
			if (state === 0) {
				sendText(sender, "Hi, I'm your birthday bot! What is your first name?");
				userData.name = event.message.text;
			} else if (state === 1) {
				sendText(
					sender,
					`Hello ${userData.name}! Nice to meet you! When is your birthdate? Please type in <YYYY-MM-DD>.`
				);
				userData.birthdate = event.message.text;
			} else if (state === 2) {
				sendText(
					sender,
					`${userData.name}, do you want to know how many days until your next birthday?`
				);
			} else if (state === 3) {
				sendText(sender, "Your next birthday is in X days");
			}
			state = state + 1;
		}
	}
	res.sendStatus(200);
});

const sendText = (sender, text) => {
	let messageData = { text: text };
	request(
		{
			url: "https://graph.facebook.com/v7.0/me/messages",
			qs: { access_token: token },
			method: "POST",
			json: {
				recipient: { id: sender },
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
	console.log(`Server is running`);
});

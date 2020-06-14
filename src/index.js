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

app.listen(app.get("port"), () => {
	console.log(`Server running`);
});
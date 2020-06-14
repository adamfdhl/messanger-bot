const mongoose = require("mongoose");

const host = "127.0.0.1";
const port = "27017";
const databaseName = "messenger-bot-api";
const connectionURL = `mongodb://${host}:${port}/${databaseName}`;

mongoose.connect(connectionURL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});

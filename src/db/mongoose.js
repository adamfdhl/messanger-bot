const mongoose = require("mongoose");

const host = "127.0.0.1";
const port = "27017";
const databaseName = "messenger-bot-api";
const connectionURL =
	process.env.MONGODB_URI || `mongodb://${host}:${port}/${databaseName}`;

mongoose.connect(connectionURL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});

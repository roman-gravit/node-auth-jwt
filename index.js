const express = require("express");
const mongoose = require("mongoose");
const AuthRouter = require("./auth-router");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;
const connect_url = process.env.MONGO_URL || "";

const app = express();

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser. 
app.use(express.json());
app.use("/auth", AuthRouter);

const start = async () => {
	try {

		await mongoose.connect(connect_url);
		app.listen(PORT, ()=>{ console.log(`app:start server started at port : ${PORT}`); })

	} catch(e) {
		console.log(`!!! app:start error: ${e}`);
	}

}

start();

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();


const start = () => {
	try {
		app.listen(PORT, ()=>{
			console.log(`app:start server started at port : ${PORT}`);
		})

	} catch(e) {
		console.log(`!!! app:start error: ${e}`);
	}

}

start();

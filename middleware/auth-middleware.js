const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET || "secret";

module.exports = function(req, resp, next) {
	if(req.method === "OPTIONS") {
		return next();
	}
	
	try {
		const token = req.headers["authorization"].split(" ")[1];
		if(!token) {
			return resp.status(403).json({message: "User is not authorized"});
		}

		const decoded = jwt.verify(token, SECRET);
		req.user = decoded;
		next();

	} catch(e) {
		console.log(e);
		return resp.status(403).json({message: "User is not authorized"});
	}
	
}
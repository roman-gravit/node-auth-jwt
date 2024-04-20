const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET || "secret";

module.exports = function(roles) {
	return function(req, resp, next) {
		if(req.method === "OPTIONS") {
			return next();
		}
		
		try {
			const token = req.headers["authorization"].split(" ")[1];
			if(!token) {
				return resp.status(403).json({message: "User is not authorized"});
			}
	
			// get roles from token and check for premissions
			const decoded = jwt.verify(token, SECRET);
			const user_roles = decoded.roles;
			let has_role = false;
			user_roles.forEach(role => {
				if(roles.includes(role)) {
					has_role = true;
				}
			})

			if(!has_role) {
				return resp.status(403).json({message: "You dont have access rights"});
			}

			next();
	
		} catch(e) {
			console.log(e);
			return resp.status(403).json({message: "User is not authorized"});
		}
	}
}

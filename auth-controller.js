const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Role = require("./models/role");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET || "secret";

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	return jwt.sign(payload, SECRET, { expiresIn: "24h"});
}


class AuthController {

	async Registration(req, resp) {
		try {

			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return resp.status(400).json({ message: `Validation failed`, errors})
			}

			const { username, password } = req.body;
			const exist_user = await User.findOne({username});
			if(exist_user) {
				return resp.status(400).json({ message: `User ${username} already exists`})
			}

			const user_role = await Role.findOne({value: "USER"});

			const hashed_pwd = bcrypt.hashSync(password, 7);
			const user = new User({username, password: hashed_pwd, roles: [user_role.value]});
				
			await user.save();
			return resp.status(200).json({ message: `User was registered`})

		} catch(e) {
			console.log(`!!! AuthController:Registration error: ${e}`);
			resp.status(400).json({ message: `!!! AuthController:Registration error: ${e}`})
		}
	}

	async Login(req, resp) {
		try {
			const { username, password } = req.body;
			const exist_user = await User.findOne({username: username});

			// may be its not a good idea: existing users can be checked this way
			// better to use 404
			if(!exist_user) {
				return resp.status(400).json({ message: `User ${username} do not exists`})
			}

			const is_pwd_valid = bcrypt.compareSync(password, exist_user.password);
			if(!is_pwd_valid) {
				return resp.status(400).json({ message: `Password is invalid`})
			}

			const token = generateAccessToken(exist_user._id, exist_user.roles);
			return resp.json(token);

		} catch(e) {
			console.log(`!!! AuthController:Login error: ${e}`);
			resp.status(400).json({ message: `!!! AuthController:Login error: ${e}`})
		}
	}

	async GetUsers(req, resp) {
		try {
			const users = await User.find();
			return resp.status(200).json(users);

		} catch(e) {
			console.log(`!!! AuthController:GetUsers error: ${e}`);
			resp.status(400).json({ message: `!!! AuthController:GetUsers error: ${e}`})
		}
	}
	
}

module.exports = new AuthController();			


// call this only once for creating roles in db
// const user_role = new RoleModel();
// const admin_role = new RoleModel({value: "ADMIN"});
// await user_role.save();
// await admin_role.save();



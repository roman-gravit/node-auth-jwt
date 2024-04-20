const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
	value: {
		type: String,
		unique: true,
		default: "USER"
	}
});

const Role = model("Role", RoleSchema);

module.exports = Role;
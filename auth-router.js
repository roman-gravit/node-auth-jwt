const Router = require("express");
const AuthController = require("./auth-controller");
const router = new Router();
const {check} = require("express-validator");
const AuthMiddleWare = require("./middleware/auth-middleware");
const RoleMiddleWare = require("./middleware/role-middleware");

router.post("/registration", [
				check("username", "Empty username").notEmpty(),
				check("password", "Password must be between 4 and 10 symbols").isLength({min:4, max:10}),
			], 
			AuthController.Registration);

router.post("/login", AuthController.Login);
router.get("/users", [RoleMiddleWare(["ADMIN"]), AuthMiddleWare], AuthController.GetUsers);

module.exports = router;
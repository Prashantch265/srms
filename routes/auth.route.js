const validator = require("../middlewares/joi.middleware");
const login = require("../validation/login");
const userRegistration = require("../validation/userRegistration");
const AuthController = require("../controllers/srms/auth.controller");
const UserController = require("../controllers/srms/user.controller");

module.exports = (router) => {
  router.route("/login").post(validator(login), AuthController.signin);

  router
    .route("/register")
    .post(validator(userRegistration), UserController.registerUser);
};

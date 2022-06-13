const validator = require("../../middlewares/joi.middleware");
const userRegistration = require("../../validation/userRegistration");
const UserController = require("../../controllers/rsmp/user.controller");

module.exports = (router) => {
  router
    .route("/user")
    .post(validator(userRegistration), UserController.registerUser);

  router.route("/user").get(UserController.fetchAllUser);

  router.route("/user/:userId").get(UserController.fetchUserById);

  router
    .route("/user/:userId")
    .put(validator(userRegistration), UserController.updateUser);

  router.route("/user/:userId").delete(UserController.deleteUser);
};

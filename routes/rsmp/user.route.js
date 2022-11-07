const validator = require("../../middlewares/joi.middleware");
const userRegistration = require("../../validation/userRegistration");
const UserController = require("../../controllers/rsmp/user.controller");
const uploadFile = require("../../lib/multer");

module.exports = (router) => {
  router
    .route("/user")
    .post(validator(userRegistration.addUser), UserController.addUser);

  router.route("/user").get(UserController.fetchAllUser);

  router.route("/user").patch(UserController.updateProfile);

  router.route("/user/:userId").get(UserController.fetchUserById);

  router
    .route("/user/:userId")
    .put(validator(userRegistration.updateUser), UserController.updateUser);

  router.route("/user/:userId").delete(UserController.deleteUser);

  router.route("/user/role/:id").get(UserController.fetchByRole);
};

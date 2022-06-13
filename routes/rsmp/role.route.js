const validator = require("../../middlewares/joi.middleware");
const role = require("../../validation/role");
const RoleController = require("../../controllers/rsmp/role.controller");

module.exports = (router) => {
  router.route("/role").post(validator(role), RoleController.addRole);

  router.route("/role").get(RoleController.fetchAllRole);

  router.route("/role/:id").get(RoleController.fetchRoleById);

  router.route("/role/:id").put(validator(role), RoleController.updateRole);

  router.route("/role/:id").delete(RoleController.deleteRole);
};

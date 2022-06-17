const validator = require("../../middlewares/joi.middleware");
const BatchController = require("../../controllers/master-configuration/batch.controller");
const batch = require("../../validation/batch");

module.exports = (router) => {
  router.route("/batch").post(validator(batch), BatchController.add);

  router.route("/batch").get(BatchController.getAll);

  router.route("/batch/:id").get(BatchController.getById);

  router.route("/batch/:id").put(validator(batch), BatchController.update);

  router.route("/batch/:id").delete(BatchController.remove);
};

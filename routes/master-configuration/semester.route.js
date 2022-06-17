const validator = require("../../middlewares/joi.middleware");
const SemesterController = require("../../controllers/master-configuration/semester.controller");
const semester = require("../../validation/semester");

module.exports = (router) => {
  router.route("/semester").post(validator(semester), SemesterController.add);

  router.route("/semester").get(SemesterController.getAll);

  router.route("/semester/:id").get(SemesterController.getById);

  router
    .route("/semester/:id")
    .put(validator(semester), SemesterController.update);

  router.route("/semester/:id").delete(SemesterController.remove);
};

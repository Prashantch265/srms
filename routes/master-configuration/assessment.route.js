const validator = require("../../middlewares/joi.middleware");
const AssessmentController = require("../../controllers/master-configuration/assessment.controller");
const assessment = require("../../validation/assessment");

module.exports = (router) => {
  router.route("/assessment").get(AssessmentController.getAll);

  router
    .route("/assessment")
    .post(validator(assessment), AssessmentController.add);

  router.route("/assessment/:id").get(AssessmentController.getById);

  router
    .route("/assessment/:id")
    .put(validator(assessment), AssessmentController.update);

  router.route("/assessment/:id").delete(AssessmentController.remove);
};

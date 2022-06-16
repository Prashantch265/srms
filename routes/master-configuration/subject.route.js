const validator = require("../../middlewares/joi.middleware");
const SubjectController = require("../../controllers/srms/subjects.controller");
const subject = require("../../validation/subjects");

module.exports = (router) => {
  router.route("/subject").post(validator(subject), SubjectController.add);

  router.route("/subject").get(SubjectController.getAll);

  router
    .route("/subject/:id")
    .put(validator(subject), SubjectController.getById);

  router.route("/subject/:id").get(SubjectController.getById);

  router.route("/subject/:id").delete(SubjectController.remove);
};

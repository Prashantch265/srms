const validator = require("../../middlewares/joi.middleware");
const SectionController = require("../../controllers/srms/section.controller");
const section = require("../../validation/section");

module.exports = (router) => {
  router.route("/section").post(validator(section), SectionController.add);

  router.route("/section").get(SectionController.getAll);

  router.route("/section/:id").get(SectionController.getById);

  router
    .route("/section/:id")
    .put(validator(section), SectionController.update);

  router.route("/section/:id").delete(SectionController.remove);
};

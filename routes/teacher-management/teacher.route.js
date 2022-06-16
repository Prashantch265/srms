const validator = require("../../middlewares/joi.middleware");
const TeacherController = require("../../controllers/srms/teachers.controller");
const teacher = require("../../validation/teachers");

module.exports = (router) => {
  router.route("/teacher").post(validator(teacher), TeacherController.add);

  router.route("/teacher").get(validator(teacher), TeacherController.getAll);

  router.route("/teacher/:id").get(TeacherController.getById);

  router
    .route("/teacher/:id")
    .put(validator(teacher), TeacherController.update);

  router.route("/teacher/:id").delete(TeacherController.remove);
};

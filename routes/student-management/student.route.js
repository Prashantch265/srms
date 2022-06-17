const validator = require("../../middlewares/joi.middleware");
const StudentController = require("../../controllers/student-management/students.controller");
const student = require("../../validation/students");

module.exports = (router) => {
  router.route("/student").post(validator(student), StudentController.add);

  router.route("/student").get(StudentController.getAll);

  router.route("/student/:id").get(StudentController.getById);

  router
    .route("/student/:id")
    .put(validator(student), StudentController.update);

  router.route("/student/:id").delete(StudentController.remove);
};

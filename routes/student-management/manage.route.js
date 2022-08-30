const ManageStudentController = require("../../controllers/student-management/manage.controller");

module.exports = (router) => {
  router.route("/manage-student").post(ManageStudentController.updateSemester);

  router.route("/manage-student").get(ManageStudentController.getAll);

  router.route("/manage-student/:id").get(ManageStudentController.getByBatch);
};

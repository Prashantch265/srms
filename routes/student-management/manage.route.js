const ManageStudentController = require("../../controllers/student-management/manage.controller");

module.exports = (router) => {
  router.route("/manage-student").post(ManageStudentController.updateSemester);
};

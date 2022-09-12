const HelperController = require("../../controllers/reports-management/helper.controller");

module.exports = (router) => {
  router.route("/student-list").get(HelperController.getStudentList);

  router.route("/semester-list").get(HelperController.getSemester);

  router.route("/section-list").get(HelperController.getSection);

  router.route("/subject-list").get(HelperController.getSubject);
};

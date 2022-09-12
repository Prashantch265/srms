const AttendanceController = require("../../controllers/reports-management/attendance-report.controller");

module.exports = (router) => {
  router
    .route("/attendance/get-student-list")
    .get(AttendanceController.getStudentList);
};

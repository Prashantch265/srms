const AttendanceController = require("../../controllers/reports-management/attendance-report.controller");

module.exports = (router) => {
  router.route("/attendance").post(AttendanceController.makeAttendance);
};

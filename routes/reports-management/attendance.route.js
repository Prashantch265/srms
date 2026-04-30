const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/reports-management/attendance-report.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");
const { authorizeStudentData } = require("../../middlewares/rbac.middleware"); // Import RBAC

module.exports = (app) => {
  router.post("/bulk", authMiddleware, attendanceController.addBulkAttendance);

  // REGISTRATION: RBAC & Row-Level Security applied here
  // Protects individual attendance records from unauthorized parent/student snooping
  router.get(
    "/:studentId",
    authMiddleware,
    authorizeStudentData,
    attendanceController.getAttendance
  );

  app.use("/attendance", router);
};

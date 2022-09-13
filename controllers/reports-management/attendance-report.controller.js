const AttendanceService = require("../../services/report-management/attendance-report.service");
const httpContext = require("express-http-context");
const { successResponse } = require("../../utils");

const makeAttendance = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const data = req.body;
    const resData = await AttendanceService.makeAttendance(data, userId);
    return successResponse(res, resData, "create", "attendance");
  } catch (error) {
    next(error);
  }
};

module.exports = { makeAttendance };

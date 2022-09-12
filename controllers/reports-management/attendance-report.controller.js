const AttendanceService = require("../../services/report-management/attendance-report.service");
const httpContext = require("express-http-context");
const { successResponse } = require("../../utils");

const getStudentList = async (req, res, next) => {
  try {
    const semesterId = req.query.semId;
    const sectionId = req.query.secId;
    const resData = await AttendanceService.getStudentList(
      semesterId,
      sectionId
    );
    return successResponse(res, resData, "fetch", "student list");
  } catch (error) {
    next(error);
  }
};

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

module.exports = { makeAttendance, getStudentList };

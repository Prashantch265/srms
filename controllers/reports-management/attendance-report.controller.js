const attendanceService = require("../../services/report-management/attendance-report.service");
const { successResponse, errorResponse } = require("../../utils");

const addBulkAttendance = async (req, res, next) => {
  try {
    const { attendance } = req.body;

    if (!attendance || !Array.isArray(attendance)) {
      return res
        .status(400)
        .json(
          errorResponse(400, "Invalid attendance format. Expected an array.")
        );
    }

    await attendanceService.bulkMarkAttendance(attendance);

    return res
      .status(201)
      .json(successResponse(201, "Attendance marked successfully"));
  } catch (error) {
    // ABSTRACT ALIGNMENT: Transactional Integrity (Integrity Pass)
    // Intercept strict isolation lock failures and return HTTP 409 Conflict
    if (error.name === "SerializationFailure") {
      return res.status(409).json(errorResponse(409, error.message));
    }
    next(error);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const data = await attendanceService.getAttendanceByStudent(studentId);

    return res
      .status(200)
      .json(successResponse(200, "Attendance fetched successfully", data));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBulkAttendance,
  getAttendance,
};

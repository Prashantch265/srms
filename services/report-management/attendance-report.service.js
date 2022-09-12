const AttendanceData = require("../../data/reports-management/attendance.data");

const makeAttendance = async (data, userId) => {
  const res = await AttendanceData.makeAttendance(data);
  return res;
};

const fetchAttendanceByStudentId = async () => {};

const fethcAttendanceBySemester = async () => {};

module.exports = { makeAttendance };

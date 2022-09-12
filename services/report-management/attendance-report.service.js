const AttendanceData = require("../../data/reports-management/attendance.data");
const HelperData = require("../../data/reports-management/helper.data");

const getStudentList = async (semesterId, sectionId) => {
  const res = await HelperData.getStudentList(semesterId, sectionId);
  return res;
};

const makeAttendance = async (data, userId) => {
  const res = await AttendanceData.makeAttendance(data);
  return res;
};

const fetchAttendanceByStudentId = async () => {};

const fethcAttendanceBySemester = async () => {};

module.exports = { getStudentList, makeAttendance };

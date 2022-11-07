const AttendanceData = require("../../data/reports-management/attendance.data");
const HelperData = require("../../data/reports-management/helper.data");
const HttpException = require("../../utils/httpException");

const makeAttendance = async (data, userId) => {
  const existingAttendance = await AttendanceData.findOneByField({
    date: data.date,
    studentId: data.studentId,
    subjectId: data.subjectId,
  });

  if (existingAttendance)
    throw new HttpException(400, "duplicateData", "attendance");

  const [teacher] = await HelperData.getTeacherId(userId);
  data.teacherId = teacher.id;
  const res = await AttendanceData.makeAttendance(data);
  return res;
};

const fetchAttendanceByStudentId = async () => {};

const fethcAttendanceBySemester = async () => {};

module.exports = { makeAttendance };

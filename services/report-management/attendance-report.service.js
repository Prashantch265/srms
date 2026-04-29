const db = require("../../lib/sequelize");
const { executeSerializableTransaction } = require("./results.service");

/**
 * ABSTRACT ALIGNMENT: Critical Data-Entry Module
 * Secures high-volume attendance marking (where multiple teachers might
 * submit data at the exact same minute) using the serializable wrapper.
 */
const bulkMarkAttendance = async (attendanceData) => {
  // Reusing the robust transaction wrapper from results.service to
  // ensure DRY (Don't Repeat Yourself) principles across the Service Layer
  return await executeSerializableTransaction(async (t) => {
    const promises = attendanceData.map(async (record) => {
      const { student_id, subject_id, date, status } = record;

      return await db.Attendance.upsert(
        {
          student_id,
          subject_id,
          date,
          status,
        },
        { transaction: t }
      );
    });

    return await Promise.all(promises);
  });
};

const getAttendanceByStudent = async (student_id) => {
  return await db.Attendance.findAll({ where: { student_id } });
};

module.exports = {
  bulkMarkAttendance,
  getAttendanceByStudent,
};

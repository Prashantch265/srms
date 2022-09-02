const AdminDashboardData = require("../../data/dashboard/admin.data");

const getAllCountData = async () => {
  let obj = {
    totalStudent: await AdminDashboardData.getTotalStudentCount(),
    totalTeacher: await AdminDashboardData.getTotalTeacherCount(),
    totalMaleTeacher: await AdminDashboardData.getMaleTeacherCount(),
    totalFemaleTeacher: await AdminDashboardData.getFemaleTeacherCount(),
    totalNonBinaryTeacher: await AdminDashboardData.getNonBinaryTeacherCount(),
    totalStudentsBySemester:
      await AdminDashboardData.getStudentCountBySemester(),
    maleStudentsBySemester:
      await AdminDashboardData.getMaleStudentCountBySemester(),
    femaleStudentsBySemester:
      await AdminDashboardData.getFemaleStudentCountBySemester(),
    nonBinaryStudentsSemester:
      await AdminDashboardData.getNonBinaryStudentCountBySemester(),
    totalAdmin: await AdminDashboardData.getAdminCount(),
  };

  return obj;
};

module.exports = { getAllCountData };

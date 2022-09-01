const HelperData = require("../../data/reports-management/helper.data");
const TeacherData = require("../../data/teacher-management/teachers.data");
const StudentData = require("../../data/student-management/students.data");

const getSection = async (semesterId, userName) => {
  const { id } = await TeacherData.findOneByField({ userName: userName });
  const res = await HelperData.getSection(semesterId, id);
  return res;
};

pconst getSubject = async () => {
  const res = await HelperData.getSubject({ s });
};

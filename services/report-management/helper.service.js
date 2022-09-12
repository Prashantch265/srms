const HelperData = require("../../data/reports-management/helper.data");
const StudentData = require("../../data/student-management/students.data");

const getSection = async (semesterId, userId) => {
  const { id } = await HelperData.getTeacherId(userId);
  const res = await HelperData.getSection(semesterId, id);
  return res;
};

const getSubject = async (sectionId, userId) => {
  const { id } = await HelperData.getTeacherId(userId);
  const res = await HelperData.getSubject(sectionId, id);
  return res;
};


module.exports = {getSection, getSubject};
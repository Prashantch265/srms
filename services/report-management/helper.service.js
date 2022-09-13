const HelperData = require("../../data/reports-management/helper.data");

const getSemester = async (userId) => {
  const [teacher] = await HelperData.getTeacherId(userId);
  const res = await HelperData.getSemester(teacher.id);
  return res;
};

const getSection = async (semesterId, userId) => {
  const [teacher] = await HelperData.getTeacherId(userId);
  const res = await HelperData.getSection(semesterId, teacher.id);
  return res;
};

const getSubject = async (sectionId, userId) => {
  const [teacher] = await HelperData.getTeacherId(userId);
  const res = await HelperData.getSubject(sectionId, teacher.id);
  return res;
};

const getStudentList = async (semesterId, sectionId) => {
  const res = await HelperData.getStudentList(semesterId, sectionId);
  return res;
};

module.exports = { getSemester, getSection, getSubject, getStudentList };

const HelperData = require("../../data/reports-management/helper.data");

const getSemester = async (userId) => {
  const { id } = await HelperData.getTeacherId(userId);
  const res = await HelperData.getSemester(id);
  return res;
};

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

const getStudentList = async (semesterId, sectionId) => {
  const res = await HelperData.getStudentList(semesterId, sectionId);
  return res;
};

module.exports = { getSemester, getSection, getSubject, getStudentList };

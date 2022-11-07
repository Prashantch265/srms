const ResultData = require("../../data/reports-management/results.data");
const HelperData = require("../../data/reports-management/helper.data");
const StudentData = require("../../data/student-management/students.data");
const SubjectData = require("../../data/master-configuration/subject.data");
const AssementData = require("../../data/master-configuration/assessment.data");
const HttpException = require("../../utils/httpException");

const validateForeignKey = async (studentId, subId, assessmentId) => {
  const student = await StudentData.findOneByField({ id: studentId });
  if (!student) throw new HttpException(400, "notFound", "student");

  const subject = await SubjectData.findOneByField({ id: subId });
  if (!subject) throw new HttpException(400, "notFound", "subject");

  const assessment = await AssementData.findOneByField({ id: assessmentId });
  if (!assessment) throw new HttpException(400, "notFound", "assessment");
};

const addResult = async (data, userId) => {
  for (const object of data) {
    const { studentId, subId, assessmentId } = object;
    await validateForeignKey(studentId, subId, assessmentId);
    const existingResult = await ResultData.findOneByField({
      studentId: studentId,
      subId: subId,
      assessmentId: assessmentId,
    });
    if (existingResult) throw new HttpException(400, "duplicateData", "result");

    await ResultData.add(object, userId);
  }
  return [];
};

const publishResult = async (semId, assessmentId) => {};

module.exports = { addResult, publishResult };

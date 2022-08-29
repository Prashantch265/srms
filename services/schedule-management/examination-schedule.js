const ExaminationScheduleData = require("../../data/schedule-management/examination-schedule.data");
const AssesmentData = require("../../data/master-configuration/assessment.data");
const SemesterData = require("../../data/master-configuration/semester.data");
const SubjectData = require("../../data/master-configuration/subject.data");
const HttpException = require("../../utils/httpException");

const validateForeignKey = async (data) => {
  const Assesment = await AssesmentData.findOneByField({
    id: data.assessmentId,
  });
  if (!Assesment) throw new HttpException(400, "notFound", "assessment");

  const Semester = await SemesterData.findOneByField({ id: data.semesterId });
  if (!Semester) throw new HttpException(400, "notFound", "assessment");

  const subject = await SubjectData.findOneByField({ id: data.subjectId });
  if (!subject) throw new HttpException(400, "notFound", "assessment");

  return;
};

const add = async (data) => {
  await validateForeignKey(data);
  const res = await ExaminationScheduleData.add(data);
  return res;
};

const getAll = async () => {
  const res = await ExaminationScheduleData.getAllExaminationSchedule();
  return res;
};

const getByAssessment = async (assessmentId) => {
  const res = await ExaminationScheduleData.getByAssessment(assessmentId);
  return res;
};

const remove = async (data) => {
  const { assessmentId, semesterId } = data;
  await ExaminationScheduleData.remove(assessmentId, semesterId);
  return;
};

module.exports = { add, getAll, getByAssessment, remove };

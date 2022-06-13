const SubjectData = require("../../data/srms/subject.data");
const SemesterData = require("../../data/srms/semester.data");
const { errorResponse, successResponse } = require("../../utils");

const validateForeignKey = async (semId) => {
  const semester = await SemesterData.findOneByField({ id: semId });
  if (!semester) return errorResponse(400, "notFound", "semester");
  return;
};

const add = async (data) => {
  const existingSubject = await SubjectData.findOneByField({ name: data.name });
  if (existingSubject) return errorResponse(400, "duplicateData", "subject");
  await validateForeignKey(data.semId);
  const res = await SubjectData.add(data);
  return successResponse(200, res, "create", "subject");
};

const update = async (data, id) => {
  const existingSubject = await SubjectData.findOneByField({ id: id });
  if (!existingSubject) return errorResponse(400, "notFound", "subject");
  const updatedSubject = { ...data, ...existingSubject };
  const res = await SubjectData.update(updatedSubject, id);
  return successResponse(200, res, "update", "subject");
};

const getAll = async () => {
  const res = await SubjectData.fetchAll();
  return successResponse(200, res, "fetch", "subject");
};

const getById = async (id) => {
  const res = await SubjectData.fetchById(id);
  if (!res) return errorResponse(400, "notFound", "subject");
  return successResponse(200, res, "fetch", "subject");
};

const getBySemester = async (semId) => {
  const res = await SubjectData.fetchBySemester(semId);
  return successResponse(200, res, "fetch", "subject");
};

const remove = async (id) => {
  const res = await SubjectData.remove(id);
  return successResponse(200, res, "delete", "subject");
};

module.exports = { add, update, getAll, getById, getBySemester, remove };

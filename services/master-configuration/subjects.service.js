const SubjectData = require("../../data/master-configuration/subject.data");
const SemesterData = require("../../data/master-configuration/semester.data");
const HttpException = require("../../utils/httpException");

const validateForeignKey = async (semId) => {
  const semester = await SemesterData.findOneByField({ id: semId });
  if (!semester) throw new HttpException(400, "notFound", "semester");
  return;
};

const add = async (data) => {
  const existingSubject = await SubjectData.findOneByField({ name: data.name });
  if (existingSubject) throw new HttpException(400, "duplicateData", "subject");
  await validateForeignKey(data.semId);
  const res = await SubjectData.add(data);
  return res;
};

const update = async (data, id) => {
  const existingSubject = await SubjectData.findOneByField({ id: id });
  if (!existingSubject) throw new HttpException(400, "notFound", "subject");
  const updatedSubject = { ...data, ...existingSubject };
  const res = await SubjectData.update(updatedSubject, id);
  return res;
};

const getAll = async () => {
  const res = await SubjectData.fetchAll();
  return res;
};

const getById = async (id) => {
  const res = await SubjectData.fetchById(id);
  if (!res) throw new HttpException(400, "notFound", "subject");
  return res;
};

const getBySemester = async (semId) => {
  const res = await SubjectData.fetchBySemester(semId);
  return res;
};

const remove = async (id) => {
  const res = await SubjectData.remove(id);
  return res;
};

module.exports = { add, update, getAll, getById, getBySemester, remove };

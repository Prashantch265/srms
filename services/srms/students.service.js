const StudentData = require("../../data/srms/students.data");
const BatchData = require("../../data/srms/batch.data");
const SectionData = require("../../data/srms/section.data");
const SemesterData = require("../../data/srms/semester.data");
const { errorResponse, successResponse } = require("../../utils/");

const validateForiegnKey = async (obj) => {
  if (obj.batchId) {
    const batch = await BatchData.findOneByField({ id: obj.batchId });
    if (!batch) return errorResponse(400, "notFound", "batch");
  } else if (obj.sectionId) {
    const section = await SectionData.findOneByField({ id: obj.sectionId });
    if (!section) return errorResponse(400, "notFound", "section");
  } else if (obj.semesterId) {
    const semester = await SemesterData.findOneByField({ id: obj.semesterId });
    if (!semester) return errorResponse(400, "notFound", "semester");
  }

  return;
};

const addDetail = async (data) => {
  let obj = { batchId: data.batchId };
  await validateForiegnKey(obj);
  const existingStudent = await StudentData.findOneByField({
    name: data.name,
    dob: data.name,
    fathersName: data.fathersName,
  });
  if (existingStudent) return errorResponse(200, "duplicateData", "student");
  const res = await StudentData.addStudentDetails(data);
  return successResponse(200, res, "create", "student");
};

const updateDetail = async (data, id) => {
  let obj = {
    batchId: data.batchId,
    secId: data.secId,
    semesterId: data.semesterId,
  };
  await validateForiegnKey(obj);
  const existingStudent = await StudentData.findOneByField({ id: id });
  if (!existingStudent) return errorResponse(400, "notFound", "student");
  const updatedStudent = { ...data, ...existingStudent };
  const res = await StudentData.updateStudentDetails(updatedStudent, id);
  return successResponse(200, res, "update", "student");
};

const getAll = async (semId) => {
  const res = await StudentData.findAll();
  return successResponse(200, res, "fetch", "student");
};

const getById = async (id) => {
  const res = await StudentData.findById(id);
  if (!res) return errorResponse(400, "notFound", "student");
  return successResponse(200, res, "fetch", "student");
};

const remove = async (id) => {
  const res = await StudentData.deleteStudentDetails(id);
  return successResponse(200, res, "delete", "student");
};

module.exports = { addDetail, updateDetail, getAll, getById, remove };

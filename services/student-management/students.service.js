const StudentData = require("../../data/student-management/students.data");
const BatchData = require("../../data/master-configuration/batch.data");
const SectionData = require("../../data/master-configuration/section.data");
const SemesterData = require("../../data/master-configuration/semester.data");
const UserData = require("../../data/rsmp/users.data");
const HttpException = require("../../utils/httpException");

const validateForiegnKey = async (obj) => {
  if (obj.batchId) {
    const batch = await BatchData.findOneByField({ id: obj.batchId });
    if (!batch) throw new HttpException(400, "notFound", "batch");
  } else if (obj.sectionId) {
    const section = await SectionData.findOneByField({ id: obj.sectionId });
    if (!section) throw new HttpException(400, "notFound", "section");
  } else if (obj.semesterId) {
    const semester = await SemesterData.findOneByField({ id: obj.semesterId });
    if (!semester) throw new HttpException(400, "notFound", "semester");
  } else if (obj.userName) {
    const user = await UserData.findOneByField({ userName: obj.userName });
    if (!user) throw new HttpException(400, "notFound", "user");
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
  if (existingStudent) throw new HttpException(200, "duplicateData", "student");
  const res = await StudentData.addStudentDetails(data);
  return res;
};

const updateDetail = async (data, id) => {
  let obj = {
    batchId: data.batchId,
    secId: data.secId,
    semesterId: data.semesterId,
    userName: data.userName,
  };
  await validateForiegnKey(obj);
  const existingStudent = await StudentData.findOneByField({ id: id });
  if (!existingStudent) throw new HttpException(400, "notFound", "student");
  const updatedStudent = { ...data, ...existingStudent };
  const res = await StudentData.updateStudentDetails(updatedStudent, id);
  return res;
};

const getAll = async (semId) => {
  if (semId) {
    const res = await StudentData.findBySemester(semId);
    return res;
  }
  const res = await StudentData.findAll();
  return res;
};

const getById = async (id) => {
  const res = await StudentData.findById(id);
  if (!res) throw new HttpException(400, "notFound", "student");
  return res;
};

const remove = async (id) => {
  const res = await StudentData.deleteStudentDetails(id);
  return res;
};

module.exports = { addDetail, updateDetail, getAll, getById, remove };

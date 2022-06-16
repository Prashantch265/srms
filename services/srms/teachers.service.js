const TeacherData = require("../../data/srms/teachers.data");
const UserData = require("../../data/rsmp/users.data");
const HttpException = require("../../utils/httpException");

const validateUserName = async (userName) => {
  const user = await UserData.findOneByField({ userName: userName });
  if (!user) throw new HttpException(400, "notFound", "user");
  return;
};

const add = async (data) => {
  const existingTeacher = await TeacherData.findOneByField({
    name: data.name,
    email: data.email,
    contact: data.contact,
  });
  if (existingTeacher) throw new HttpException(400, "duplicateData", "teacher");
  const res = TeacherData.addTeacherDetails(data);
  return res;
};

const update = async (data, id) => {
  const existingTeacher = await TeacherData.findOneByField({ id: id });
  if (!existingTeacher) throw new HttpException(400, "notFound", "teacher");
  await validateUserName(data.userName);
  const updatedTeacher = { ...data, ...existingTeacher };
  const res = await TeacherData.updateTeacherDetails(updatedTeacher, id);
  return res;
};

const getAll = async () => {
  const res = await TeacherData.findAll();
  return res;
};

const getById = async (id) => {
  const res = await TeacherData.findById(id);
  return res;
};

const getBySemester = async (semId) => {
  const res = await TeacherData.findBySemester(semId);
  return res;
};

const remove = async (id) => {
  const res = await TeacherData.deleteTeacherDetails(id);
  return res;
};

module.exports = { add, update, getAll, getById, getBySemester, remove };

const TeacherData = require("../../data/teacher-management/teachers.data");
const RoleData = require("../../data/rsmp/role.data");
const HttpException = require("../../utils/httpException");
const slugify = require("slugify");
const random = require("random-key");
const { domainName } = require("../../config/config");
const UserService = require("../rsmp/users.service");
const mailer = require("../../utils/node-mailer");
const SemesterData = require("../../data/master-configuration/semester.data");
const SemesterSection = require("../../data/teacher-management/semester-section.data");
const SectionData = require("../../data/master-configuration/section.data");
const SubjectData = require("../../data/master-configuration/subject.data");

const validateForiegnKey = async (data) => {
  const { semId, secId, teacherId, subId } = data;
  const teacher = await TeacherData.findOneByField({ id: teacherId });
  if (!teacher) throw new HttpException(400, "notFound", "teacher");

  const semester = await SemesterData.findOneByField({ id: semId });
  if (!semester) throw new HttpException(400, "notFound", "semester");

  const section = await SectionData.findOneByField({ id: secId });
  if (!section) throw new HttpException(400, "notFound", "section");

  const subject = await SubjectData.findOneByField({ id: subId });
  if (!subject) throw new HttpException(400, "notFound", "subject");

  return;
};

const add = async (data) => {
  const { name } = data;
  const existingTeacher = await TeacherData.findOneByField({
    name: name,
    email: data.email,
    contactNo: data.contactNo,
  });
  if (existingTeacher) throw new HttpException(400, "duplicateData", "teacher");
  const userName = `${slugify(name, {
    replacement: ".",
    lower: true,
    trim: true,
  })}${random.generateDigits(4)}@${domainName}`;
  const password = random.generate(7);
  const { id } = await RoleData.findOneByField({ name: "teacher" });

  const user = await UserService.registerNewUser({
    userName,
    password,
    roleId: id,
  });

  data.userName = user.userName;

  const res = await TeacherData.addTeacherDetails(data);

  let mailerData = {
    reciever: res.email,
    subject: "SRMS login credential",
    templateFile: "login-credential",
    context: {
      userName: user.userName,
      password: password,
    },
  };

  await mailer.nodeMailer(mailerData);
  return res;
};

const update = async (data, id) => {
  const existingTeacher = await TeacherData.findOneByField({ id: id });
  if (!existingTeacher) throw new HttpException(400, "notFound", "teacher");
  const updatedTeacher = { ...data, ...existingTeacher };
  const res = await TeacherData.updateTeacherDetails(updatedTeacher, id);
  return res;
};

const manageTeacher = async (data, id) => {
  await validateForiegnKey(data);
  if (id) {
    const existingMapping = await SemesterSection.findOneByField({ id: id });
    if (!existingMapping) throw new HttpException(400, "notFound", "mapping");
    const updatedMapping = { ...data, ...existingMapping };
    const res = await SemesterSection.update(updatedMapping, id);
    return res;
  }
  const res = await SemesterSection.add(data);
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

const removeMapping = async (id) => {
  const res = await SemesterData.remove(id);
  return res;
};

module.exports = {
  add,
  update,
  getAll,
  getById,
  getBySemester,
  remove,
  manageTeacher,
  removeMapping,
};

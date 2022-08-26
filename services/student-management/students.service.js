const StudentData = require("../../data/student-management/students.data");
const BatchData = require("../../data/master-configuration/batch.data");
const SectionData = require("../../data/master-configuration/section.data");
const SemesterData = require("../../data/master-configuration/semester.data");
const RoleData = require("../../data/rsmp/role.data");
const UserData = require("../../data/rsmp/users.data");
const HttpException = require("../../utils/httpException");
const slugify = require("slugify");
const random = require("random-key");
const { domainName } = require("../../config/config");
const UserService = require("../rsmp/users.service");
const mailer = require("../../utils/node-mailer");
const SemesterStudent = require("../../data/student-management/semester-student.data");

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
  const { name } = data;
  await validateForiegnKey(obj);
  const existingStudent = await StudentData.findOneByField({
    name: data.name,
    dob: data.name,
    fathersName: data.fathersName,
  });
  if (existingStudent) throw new HttpException(200, "duplicateData", "student");

  const userName = `${slugify(name, {
    replacement: ".",
    lower: true,
    trim: true,
  })}${random.generateDigits(4)}@${domainName}`;
  const password = random.generate(7);
  const { id } = await RoleData.findOneByField({ name: "student" });

  const user = await UserService.registerNewUser({
    userName,
    password,
    roleId: id,
  });

  data.userName = user.userName;

  const res = await StudentData.addStudentDetails(data);

  const semester = await SemesterData.findOneByField({
    name: "First Semester",
  });

  await SemesterStudent.add({ semId: semester.id, studentId: res.id });

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

const updateDetail = async (data, id) => {
  const existingStudent = await StudentData.findOneByField({ id: id });
  if (!existingStudent) throw new HttpException(400, "notFound", "student");
  const updatedStudent = { ...data, ...existingStudent };
  const res = await StudentData.updateStudentDetails(updatedStudent, id);
  return res;
};

const addMappingSemesterStudent = async (data) => {
  let obj = {
    batchId: data.batchId,
    semesterId: data.semesterId,
  };
  await validateForiegnKey(obj);

  const students = await SemesterStudent.getStudentsByBatch(data.batchId);
  for (const id of students) {
    let data = {
      semId: data.semesterId,
      studentId: id,
    };

    await SemesterStudent.add(data);
  }
  return [];
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

const getByBatch = async (batchId) => {
  const res = await StudentData.findByBatch(batchId);
  if (!res) throw new HttpException(400, "notFound", "student");
  return res;
};

const getBySemester = async (semId) => {
  const res = await StudentData.findBySemester(semId);
  if (!res) throw new HttpException(400, "notFound", "student");
  return res;
};

const remove = async (id) => {
  const res = await StudentData.deleteStudentDetails(id);
  return res;
};

module.exports = {
  addDetail,
  updateDetail,
  getAll,
  getById,
  remove,
  getByBatch,
  getBySemester,
  addMappingSemesterStudent,
};

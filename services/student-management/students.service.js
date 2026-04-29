const StudentData = require("../../data/student-management/students.data");
const BatchData = require("../../data/master-configuration/batch.data");
const SectionData = require("../../data/master-configuration/section.data");
const SemesterData = require("../../data/master-configuration/semester.data");
const RoleData = require("../../data/rbac/role.data");
const UserData = require("../../data/rbac/users.data");
const HttpException = require("../../utils/httpException");
const slugify = require("slugify");
const random = require("random-key");
const { domainName } = require("../../config/config");
const UserService = require("../rbac/user.service");
const mailer = require("../../utils/node-mailer");
const SemesterStudent = require("../../data/student-management/semester-student.data");
const db = require("../../lib/sequelize");
const { Transaction } = require("sequelize");

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

  const user = await UserService.createUser({
    userName,
    password, // Handled automatically by our Area 1 update
    roles: [id],
  });

  data.userName = user.user.userName; // Adjusting for the new returned payload format

  const res = await StudentData.addStudentDetails(data);

  const semester = await SemesterData.findOneByField({
    name: "First Semester",
  });

  await SemesterStudent.add({
    semId: semester.id,
    studentId: res.id,
    batchId: data.batchId,
  });

  // Adjusting node-mailer implementation
  let mailerData = {
    reciever: res.email,
    subject: "SRMS login credential",
    templateFile: "login-credential",
    context: {
      userName: user.user.userName,
      password: user.tempPassword,
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
  const { batchId, semesterId } = data;
  let obj = {
    batchId: batchId,
    semesterId: semesterId,
  };
  await validateForiegnKey(obj);

  // ABSTRACT ALIGNMENT: Transactional Integrity for Batch Operations
  // Using cls-hooked injected transaction context to ensure atomicity.
  // If this fails halfway, the transaction rolls back, preventing a corrupted split-batch state.
  return await db.sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
    async (t) => {
      const existingMapping = await SemesterStudent.getExistingMappingByBatch(
        batchId
      );

      if (existingMapping && existingMapping.length > 0) {
        await SemesterStudent.remove(batchId);
      }

      const students = await SemesterStudent.getStudentsByBatch(batchId);
      for (const student of students) {
        let mapData = {
          batchId: parseInt(batchId),
          semId: parseInt(semesterId),
          studentId: student.id,
        };

        // Because CLS is used in lib/sequelize.js, this nested DAL call uses the transaction automatically
        await SemesterStudent.add(mapData);
      }
      return [];
    }
  );
};

const getAll = async () => {
  const res = await StudentData.findAll();
  return res;
};

const getById = async (id) => {
  const res = await StudentData.findById(id);
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

const getDataFromMapping = async () => {
  const res = await SemesterStudent.getStudentList();
  return res;
};

const getDataFromMappingByBatch = async (batchId) => {
  const res = await SemesterStudent.getStudentListByBatch(batchId);
  return res;
};

module.exports = {
  addDetail,
  updateDetail,
  getById,
  getAll,
  remove,
  getBySemester,
  addMappingSemesterStudent,
  getDataFromMapping,
  getDataFromMappingByBatch,
};

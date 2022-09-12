const { Batch } = require("../../database/models");
const StudentData = require("../../data/student-management/students.data");
const UserData = require("../../data/rsmp/users.data");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Batch.findOne({ where });
};

const add = async (data) => {
  return await Batch.create(data);
};

const update = async (data, id) => {
  const { passedOut } = data;
  if (passedOut) {
    const students = await StudentData.findByBatch(id);
    await StudentData.updateStudentBatch({ isActive: false }, id);
    for (let student of students) {
      await UserData.removeByUserName(student.userName);
    }
  }
  return await Batch.update(data, { where: { id: id } });
};

const remove = async (id) => {
  await Batch.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await Batch.findAll({
    order: [["created_at", "DESC"]],
    where: { isActive: true, isDeleted: false },
  });
};

const fetchCurrentBatch = async () => {
  return await Batch.findAll({
    order: [["created_at", "DESC"]],
    where: { passedOut: false, isActive: true, isDeleted: false },
  });
};

module.exports = {
  findOneByField,
  add,
  update,
  fetchAll,
  remove,
  fetchCurrentBatch,
};

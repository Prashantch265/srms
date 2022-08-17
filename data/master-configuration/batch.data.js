const { Batch } = require("../../database/models");
const StudentData = require("../../data/student-management/students.data");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Batch.findOne({ where });
};

const add = async (data) => {
  return await Batch.create(data);
};

const update = async (data, id) => {
  const { passedOut } = data;
  if (passedOut) StudentData.updateStudentBatch({ isActive: false }, id);
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

module.exports = { findOneByField, add, update, fetchAll, remove };

const { SemesterStudent } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const getByBatchQuery = `select * from students where is_active = true and is_deleted = false and batch_id = $1`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await SemesterStudent.findOne({ where });
};

const add = async (data) => {
  return await SemesterStudent.create(data);
};

const update = async (data, id) => {
  return await SemesterStudent.update(data, { where: { id: id } });
};

const getStudentsByBatch = async (batchId) => {
  const replacements = [];
  replacements.push(batchId);
  return await db.sequelize.query(getByBatchQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const remove = async (id) => {
  await SemesterStudent.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

module.exports = { findOneByField, add, update, remove, getStudentsByBatch };

const { SemesterSection } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await SemesterSection.findOne({ where });
};

const add = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await SemesterSection.create(data);
  });
};

const update = async (data, id) => {
  return await SemesterSection.update(data, { where: { teacherId: id } });
};

const remove = async (teacherId, subId) => {
  await SemesterSection.update(
    { isActive: false, isDeleted: true },
    { where: { teacherId: teacherId, subId: subId } }
  );
  return teacherId;
};

module.exports = { findOneByField, add, update, remove };

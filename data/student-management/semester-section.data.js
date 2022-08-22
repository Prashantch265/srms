const { SemesterSectionStudent } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await SemesterSectionStudent.findOne({ where });
};

const add = async (data) => {
  return await SemesterSectionStudent.create(data);
};

const update = async (data, id) => {
  return await SemesterSectionStudent.update(data, { where: { id: id } });
};

const remove = async (id) => {
  await SemesterSectionStudent.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

module.exports = { findOneByField, add, update, remove };

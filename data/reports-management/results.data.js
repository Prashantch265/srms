const { Result } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Result.findOne({ where });
};

const add = async (data) => {
  return await Result.create(data);
};

const update = async (data, id) => {
  return await Result.update(data, { where: { id: id } });
};

const fetchBySemester = async (semId) => {};

const fetchByType = async (assessmentId) => {};

const fetchByStudentId = async (studentId) => {};

const remove = async (id) => {
  await Result.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

module.exports = { add, update, remove, findOneByField };

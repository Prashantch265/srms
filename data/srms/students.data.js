const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");
const { Student } = require("../../database/models");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Student.findOne({ where });
};

const addStudentDetails = async (data) => {
  return await Student.create(data);
};

const updateStudentDetails = async (data) => {
  return await data.save();
};

const findAll = async () => {};

const findById = async () => {};

const deleteStudentDetails = async (id) => {
  return await Student.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = {
  addStudentDetails,
  updateStudentDetails,
  findAll,
  findById,
  deleteStudentDetails,
};

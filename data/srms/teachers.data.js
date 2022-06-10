const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");
const { Teacher } = require("../../database/models");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Teacher.findOne({ where });
};

const addTeacherDetails = async (data) => {
  return await Teacher.create(data);
};

const updateTeacherDetails = async (data) => {
  return await data.save();
};

const findAll = async () => {};

const findById = async () => {};

const deleteTeacherDetails = async (id) => {
  return await Teacher.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = {
  addTeacherDetails,
  updateTeacherDetails,
  findAll,
  findById,
  deleteTeacherDetails,
};

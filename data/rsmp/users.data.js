const { User } = require("../../database/models/index");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await User.findOne({ where });
};

const register = async (data) => {
  return await User.create(data);
};

const update = async (data) => {
  return await data.save();
};

const remove = async (id) => {
  await User.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await User.findAll({ where: { isActive: true, isDeleted: false } });
};

module.exports = { register, update, findOneByField, remove, fetchAll };

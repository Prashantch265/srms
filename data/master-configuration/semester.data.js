const { Semester } = require("../../database/models");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Semester.findOne({ where });
};

const add = async (data) => {
  return await Semester.create(data);
};

const update = async (data, id) => {
  return await Semester.update(data, { where: { id: id } });
};

const fetchAll = async () => {
  return await Semester.findAll({
    where: { isActive: true, isDeleted: false },
  });
};

const remove = async (id) => {
  return await Semester.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = { findOneByField, add, update, fetchAll, remove };

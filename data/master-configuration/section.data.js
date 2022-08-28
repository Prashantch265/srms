const { Section } = require("../../database/models/");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Section.findOne({ where });
};

const add = async (data) => {
  return await Section.create(data);
};

const update = async (data, id) => {
  return await Section.update(data, { where: { id: id } });
};

const remove = async (id) => {
  await Section.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await Section.findAll({
    where: { isActive: true, isDeleted: false },
    order: [["displayName", "ASC"]],
  });
};

module.exports = { findOneByField, add, update, fetchAll, remove };

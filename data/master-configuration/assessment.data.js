const { Assessment } = require("../../database/models");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Assessment.findOne({ where });
};

const add = async (data) => {
  return await Assessment.create(data);
};

const update = async (data, id) => {
  return await Assessment.update(data, { where: { id: id } });
};

const fetchAll = async () => {
  return await Assessment.findAll({
    where: { isActive: true, isDeleted: false },
  });
};

const remove = async (id) => {
  await Assessment.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

module.exports = { add, update, findOneByField, fetchAll, remove };

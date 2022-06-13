const { Subject } = require("../../database/models/");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const selectQuery = `select
subjects.id, subjects.name, subjects.display_name, subjects.code, semester.name
from subjects
inner join semester on semester.id = subjects.semester_id and semester.is_active is true
where subjects.is_active = true and subjects.is_deleted = false`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Subject.findOne({ where });
};

const add = async (data) => {
  return await Subject.create(data);
};

const update = async (data, id) => {
  return await Subject.update(data, { where: { id: id } });
};

const fetchAll = async () => {
  const res = await db.sequelize.query(selectQuery, {
    type: QueryTypes.SELECT,
  });
  return res;
};

const fetchById = async (id) => {
  const replacements = [];
  const whereQuery = ` and subjects.id = $1`;
  replacements.push(id);
  const res = await db.sequelize.query(selectQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
  return res;
};

const fetchBySemester = async (semId) => {
  const replacements = [];
  const whereQuery = ` and subjects.semester_id = $1`;
  replacements.push(semId);
  const res = await db.sequelize.query(selectQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
  return res;
};

const remove = async (id) => {
  return await Subject.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = {
  add,
  update,
  fetchAll,
  fetchById,
  findOneByField,
  fetchBySemester,
  remove,
};

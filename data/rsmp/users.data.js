const { User } = require("../../database/models/index");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

let selectQuery = `select users.user_name, users.profile_pic, roles.name
from user_role
inner join users on user_role.user_id = users.user_id
inner join roles on roles.id = user_role.role_id
where users.is_deleted = false and users.is_active = true`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await User.findOne({ where });
};

const register = async (data) => {
  return await User.create(data);
};

const update = async (data, userId) => {
  return await User.update(data, { where: { userId: userId } });
};

const remove = async (id) => {
  await User.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
  return id;
};

const fetchAll = async () => {
  return await db.sequelize.query(selectQuery, { type: QueryTypes.SELECT });
};

const fetchById = async (userId) => {
  let whereQuery = ` and users.userId = $1`;
  let replacements = [userId];
};

module.exports = { register, update, findOneByField, remove, fetchAll };

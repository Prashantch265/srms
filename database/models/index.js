const db = require("../../lib/sequelize");
module.exports = {
  Role: db.roles,
  Privilege: db.privileges,
  Screen: db.screens,
  User: db.users,
  Student: db.students,
  Parent: db.parents,
  Section: db.section,
  Batch: db.batch,
};

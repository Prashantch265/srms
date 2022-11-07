const { Attendance } = require("../../database/models");
const db = require("../../lib/sequelize");

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Attendance.findOne({ where });
};

const makeAttendance = async (data, userId) => {
  return await db.sequelize.transaction(async (t) => {
    return await Attendance.create(data, { userId });
  });
};

module.exports = { findOneByField, makeAttendance };

const { Attendance } = require("../../database/models");
const db = require("../../lib/sequelize");

const makeAttendance = async (data, userId) => {
  return await db.sequelize.transaction(async (t) => {
    return await Attendance.create(data, { userId });
  });
};

module.exports = { makeAttendance };

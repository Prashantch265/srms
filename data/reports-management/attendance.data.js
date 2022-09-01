const { Attendance } = require("../../database/models");
const db = require("../../lib/sequelize");

const 

const add = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await Attendance.create(data);
  });
};

const 
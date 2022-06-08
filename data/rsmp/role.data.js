const { Role } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const findOneByField = async (where) => {
    where = { ...where, isActive: true, isDeleted: false };
    return await User.findOne({ where });
}

module.exports = { findOneByField };
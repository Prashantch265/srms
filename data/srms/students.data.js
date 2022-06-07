const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");
const { Student } = require("../../database/models");

const findOneByField = async (where) => {
    where = { ...where, isActive: true, isDeleted: false };
    return await Art.findOne({ where });
}

const addStudentDetails = async(data) => {
    
}
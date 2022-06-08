const { Privilege } = require('../../database/models');
const { db } = require('../../lib/sequelize');
const { QueryTypes } = require('sequelize');

const findOneByField = async (where) => {
    where = { ...where, isActive: true, isDeleted: false };
    return await Privilege.findOne({ where });
}

const add = async (data, userId) => {
    return await Privilege.create(data, { userId });
}

const update = async (data) => {
    return await data.save();
}

const remove = async (id, userId) => {
    await Privilege.update({ isActive: false, isDeleted: true, updatedBy: userId }, { where: { id: id } })
    return id;
}

module.exports = { add, update, findOneByField, remove };
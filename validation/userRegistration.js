const Joi = require("joi");

const addUser = Joi.object().keys({
  userName: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(12).required(),
  roleId: Joi.number().optional(),
});

const updateUser = Joi.object().keys({
  password: Joi.string().min(3).max(12).required(),
});

module.exports = { addUser, updateUser };

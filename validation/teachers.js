const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(6).max(30).required(),
  address: Joi.string().min(6).max(155).required(),
  gender: Joi.string().valid("male", "female", "others"),
  contactNo: Joi.string().min(10).max(10).required(),
  email: Joi.string().email().required(),
  type: Joi.string().valid("full-time", "part-time"),
});

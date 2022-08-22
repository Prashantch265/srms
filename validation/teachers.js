const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(6).max(30).required().trim(),
  address: Joi.string().min(6).max(155).required().trim(),
  gender: Joi.string().valid("male", "female", "others").trim(),
  contactNo: Joi.string().min(10).max(14).required().trim(),
  email: Joi.string().email().required().trim(),
  type: Joi.string().valid("full-time", "part-time").trim(),
});

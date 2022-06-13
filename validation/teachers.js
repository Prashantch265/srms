const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(6).max(30).required(),
  gender: Joi.string().allow(["male", "female", "others"]),
  contactNo: Joi.string().min(10).max(10).required(),
  email: Joi.string().email().required(),
  type: Joi.string().allow(["permanent", "part-time"]),
});

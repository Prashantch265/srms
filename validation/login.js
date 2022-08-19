const Joi = require("joi");

module.exports = Joi.object().keys({
  userName: Joi.string().min(3).max(50).required().trim(),
  password: Joi.string().min(3).max(12).required().trim(),
});

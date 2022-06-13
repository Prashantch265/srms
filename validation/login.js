const Joi = require("joi");

module.exports = Joi.object()
  .keys({
    userName: Joi.string().max(50).required(),
    password: Joi.string().max(12).required(),
  })
  .meta({ className: "login" });

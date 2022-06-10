const Joi = require("joi");

module.exports = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .min(8)
    .max(12)
    .required(),
});

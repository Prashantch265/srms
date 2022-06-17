const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string().max(255).optional(),
});

const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(5).max(50).required(),
  displayName: Joi.string().min(10).required(),
  code: Joi.string().min(2).max(10).required(),
  semId: Joi.number().required(),
});

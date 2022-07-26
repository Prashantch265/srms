const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().max(10).required(),
  displayName: Joi.string().max(10).optional(),
  passedOut: Joi.boolean().optional(),
});

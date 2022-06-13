const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(6).max(25).required(),
  gender: Joi.string().allow(["male", "female", "others"]).required(),
  dob: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().min(10).max(10).required(),
  fathersName: Joi.string().min(6).max(25).required(),
  mothersName: Joi.string().min(6).max(25).required(),
  guardiansName: Joi.string().min(6).max(25).optional(),
  parentsEmail: Joi.string().email().required(),
  fathersContactNo: Joi.string().min(10).max(10).required(),
  mothersContactNo: Joi.string().min(10).max(10).required(),
  guardiansContactNo: Joi.string().min(10).max(10).optional(),
  batchId: Joi.number().required(),
});

const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(6).max(25).required(),
  gender: Joi.string().valid("male", "female", "others").required(),
  dob: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().min(10).max(14).required(),
  batchId: Joi.number().required(),
  permanentAddress: Joi.string().min(4).max(255).required(),
  currentAddress: Joi.string().min(4).max(255).required(),
  fathersName: Joi.string().min(6).max(25).required(),
  mothersName: Joi.string().min(6).max(25).required(),
  guardiansName: Joi.allow(null),
  parentsEmail: Joi.string().email().required(),
  fathersContactNo: Joi.string().min(10).max(14).required(),
  mothersContactNo: Joi.string().min(10).max(14).required(),
  guardiansContactNo: Joi.allow(null),
});

const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().min(6).max(25).required().trim(),
  gender: Joi.string().valid("male", "female", "others").required().trim(),
  dob: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  contactNo: Joi.string().min(10).max(14).required().trim(),
  batchId: Joi.number().required(),
  permanentAddress: Joi.string().min(4).max(255).required().trim(),
  currentAddress: Joi.string().min(4).max(255).required().trim(),
  fathersName: Joi.string().min(6).max(25).required().trim(),
  mothersName: Joi.string().min(6).max(25).required().trim(),
  guardiansName: Joi.allow(null),
  parentsEmail: Joi.string().email().required().trim(),
  fathersContactNo: Joi.string().min(10).max(14).required().trim(),
  mothersContactNo: Joi.string().min(10).max(14).required().trim(),
  guardiansContactNo: Joi.allow(null),
});

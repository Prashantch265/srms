const AssessmentService = require("../../services/master-configuration/assessment.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await AssessmentService.add(data);
    return successResponse(res, resData, "create", "assessment");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await AssessmentService.update(data, id);
    return successResponse(res, resData, "update", "assessment");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const resData = await AssessmentService.getAll();
  return successResponse(res, resData, "fetch", "assessment");
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await AssessmentService.getById(id);
  return successResponse(res, resData, "fetch", "assessment");
};

const remove = async (req, res, next) => {
  const id = req.params.id;
  const resData = await AssessmentService.remove(id);
  return successResponse(res, resData, "delete", "assessment");
};

module.exports = { add, update, getAll, getById, remove };

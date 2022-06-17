const SemesterService = require("../../services/master-configuration/semester.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await SemesterService.add(data);
    return successResponse(res, resData, "create", "semester");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await SemesterService.update(data, id);
    return successResponse(res, resData, "update", "semester");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const resData = await SemesterService.getAll();
  return successResponse(res, resData, "fetch", "semester");
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SemesterService.getById(id);
  return successResponse(res, resData, "fetch", "semester");
};

const remove = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SemesterService.remove(id);
  return successResponse(res, resData, "delete", "semester");
};

module.exports = { add, update, getAll, getById, remove };

const BatchService = require("../../services/srms/batch.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await BatchService.add(data);
    return successResponse(res, resData, "create", "batch");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await BatchService.update(data, id);
    return successResponse(res, resData, "update", "batch");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const resData = await BatchService.getAll();
  return successResponse(res, resData, "fetch", "batch");
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await BatchService.getById(id);
    return successResponse(res, resData, "fetch", "batch");
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await BatchService.remove(id);
    return successResponse(res, resData, "delete", "batch");
  } catch (error) {
    next(error);
  }
};

module.exports = { add, update, getAll, getById, remove };

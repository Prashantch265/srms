const StudentService = require("../../services/srms/students.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await StudentService.addDetail(data);
    return successResponse(res, resData, "create", "student");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await StudentService.updateDetail(data, id);
    return successResponse(res, resData, "update", "student");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const resData = await StudentService.getAll();
  return successResponse(res, resData, "fetch", "student");
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await StudentService.getById(id);
    return successResponse(res, resData, "fetch", "student");
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await StudentService.remove(id);
    return successResponse(res, resData, "delete", "student");
  } catch (error) {
    next(error);
  }
};

module.exports = { add, update, getAll, getById, remove };

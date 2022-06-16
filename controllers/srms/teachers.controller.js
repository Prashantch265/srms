const TeacherService = require("../../services/srms/teachers.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await TeacherService.add(data);
    return successResponse(res, resData, "create", "teacher");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await TeacherService.update(data, id);
    return successResponse(res, resData, "update", "teacher");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const semId = req.query.semesterId;
  let resData;
  if (semId) {
    resData = await TeacherService.getBySemester(semId);
    return successResponse(res, resData, "fetch", "teacher");
  }
  resData = await TeacherService.getAll();
  return successResponse(res, resData, "fetch", "teacher");
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await TeacherService.getById(id);
  return successResponse(res, resData, "fetch", "teacher");
};

const remove = async (req, res, next) => {
  const id = req.params.id;
  const resData = await TeacherService.remove(id);
  return successResponse(res, resData, "delete", "teacher");
};

module.exports = { add, update, getAll, getById, remove };

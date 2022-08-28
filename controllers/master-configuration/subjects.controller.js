const SubjectService = require("../../services/master-configuration/subjects.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await SubjectService.add(data);
    return successResponse(res, resData, "create", "subject");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const resData = await SubjectService.update(data, id);
    return successResponse(res, resData, "update", "subject");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const semId = req.query.semester;
  let resData;
  if (semId) resData = await SubjectService.getBySemester(semId);
  resData = await SubjectService.getAll();
  return successResponse(res, resData, "fetch", "subject");
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await SubjectService.getById(id);
    return successResponse(res, resData, "fetch", "subject");
  } catch (error) {
    next(error);
  }
};

const getBySemester = async (req, res, next) => {
  try {
    const semId = req.params.id;
    const resData = await SubjectService.getBySemester(semId);
    return successResponse(res, resData, "fetch", "subject");
  } catch (error) {
    next(error);
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await SubjectService.remove(id);
    return successResponse(res, resData, "delete", "subject");
  } catch (error) {
    next(error);
  }
};

module.exports = { add, update, getAll, getById, getBySemester, remove };

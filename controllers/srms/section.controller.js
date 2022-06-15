const SectionService = require("../../services/srms/section.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await SectionService.add(data);
    return successResponse(res, resData, "create", "section");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await SectionService.update(data, id);
    return successResponse(res, resData, "update", "section");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const resData = await SectionService.findAll();
  return successResponse(res, resData, "fetch", "section");
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SectionService.findById(id);
  return successResponse(res, resData, "fetch", "section");
};

const remove = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SectionService.remove(id);
  return successResponse(res, resData, "delete", "section");
};

module.exports = { add, update, getAll, getById, remove };

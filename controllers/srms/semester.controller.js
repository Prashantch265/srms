const SemesterService = require("../../services/srms/semester.service");

const add = async (req, res, next) => {
  const data = req.body;
  const resData = await SemesterService.add(data);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const update = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const resData = await SemesterService.update(data, id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const getAll = async (req, res, next) => {
  const resData = await SemesterService.getAll();
  return res.json(resData);
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SemesterService.getById(id);
  return res.json(resData);
};

const remove = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SemesterService.remove(id);
  return res.json(resData);
};

module.exports = { add, update, getAll, getById, remove };

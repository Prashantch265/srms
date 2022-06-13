const SubjectService = require("../../services/srms/subjects.service");

const add = async (req, res, next) => {
  const data = req.body;
  const resData = await SubjectService.add(data);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const update = async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const resData = await SubjectService.update(data, id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const getAll = async (req, res, next) => {
  const semId = req.query.semester;
  let resData;
  if (semId) resData = await SubjectService.getBySemester(semId);
  resData = await SubjectService.getAll();
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SubjectService.getById(id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

const remove = async (req, res, next) => {
  const id = req.params.id;
  const resData = await SubjectService.remove(id);
  if (resData.success === false) return next(resData);
  return res.json(resData);
};

module.exports = { add, update, getAll, getById, remove };

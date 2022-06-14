const SemesterData = require("../../data/srms/semester.data");
const { errorResponse, successResponse } = require("../../utils");

const add = async (data) => {
  const existingSemester = await SemesterData.findOneByField({
    name: data.name,
  });
  if (existingSemester) return errorResponse(400, "duplicateData", "semester");
  const res = await SemesterData.add(data);
  return successResponse(200, res, "create", "semester");
};

const update = async (data, id) => {
  const existingSemester = await SemesterData.findOneByField({ id: id });
  if (!existingSemester) return errorResponse(400, "notFound", "semester");
  const updatedSemester = { ...data, ...existingSemester };
  const res = await SemesterData.update(updatedSemester, id);
  return successResponse(200, res, "update", "semester");
};

const getAll = async () => {
  const res = await SemesterData.fetchAll();
  return successResponse(200, res, "fetch", "semester");
};

const getById = async (id) => {
  const res = await SemesterData.findOneByField({ id: id });
  return successResponse(200, res, "fetch", "semester");
};

const remove = async (id) => {
  const res = await SemesterData.remove(id);
  return successResponse(200, res, "delete", "semester");
};

module.exports = { add, update, getAll, getById, remove };

const BatchData = require("../../data/srms/batch.data");
const { errorResponse, successResponse } = require("../../utils");

const add = async (data) => {
  const existingBatch = await BatchData.findOneByField({ name: data.name });
  if (existingBatch) return errorResponse(400, "duplicateData", "batch");
  const res = await BatchData.add(data);
  return successResponse(200, res, "create", "batch");
};

const update = async (data, id) => {
  const existingBatch = await BatchData.findOneByField({ id: id });
  if (!existingBatch) return errorResponse(400, "notFound", "batch");
  const updatedBatch = { ...data, ...existingBatch };
  const res = await BatchData.update(updatedBatch, id);
  return successResponse(200, res, "update", "batch");
};

const getAll = async () => {
  const res = await BatchData.fetchAll();
  return successResponse(200, res, "fetch", "batch");
};

const getById = async (id) => {
  const res = await BatchData.findOneByField({ id: id });
  if (!res) return errorResponse(400, "notFound", "batch");
  return successResponse(200, res, "fetch", "batch");
};

const remove = async (id) => {
  const existingBatch = await BatchData.findOneByField({ id: id });
  if (!existingBatch) return errorResponse(400, "notFound", "batch");
  const res = await BatchData.remove(id);
  return successResponse(200, res, "delete", "batch");
};

module.exports = { add, update, getAll, getById, remove };

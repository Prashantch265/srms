const BatchData = require("../../data/master-configuration/batch.data");
const StudentData = require("../../data/student-management/students.data");
const HttpException = require("../../utils/httpException");

const add = async (data) => {
  const existingBatch = await BatchData.findOneByField({ name: data.name });
  if (existingBatch) throw new HttpException(400, "duplicateData", "batch");
  const res = await BatchData.add(data);
  return res;
};

const update = async (data, id) => {
  const existingBatch = await BatchData.findOneByField({ id: id });
  if (!existingBatch) throw new HttpException(400, "notFound", "batch");
  const updatedBatch = { ...data, ...existingBatch };
  const res = await BatchData.update(updatedBatch, id);
  return res;
};

const getAll = async () => {
  const res = await BatchData.fetchAll();
  return res;
};

const getCurrent = async () => {
  const res = await BatchData.fetchCurrentBatch();
  return res;
};

const getById = async (id) => {
  const res = await StudentData.findByBatch(id);
  if (!res) throw new HttpException(400, "notFound", "batch");
  return res;
};

const remove = async (id) => {
  const existingBatch = await BatchData.findOneByField({ id: id });
  if (!existingBatch) throw new HttpException(400, "notFound", "batch");
  const res = await BatchData.remove(id);
  return res;
};

module.exports = { add, update, getAll, getById, remove, getCurrent };

const SemesterData = require("../../data/master-configuration/semester.data");
const HttpException = require("../../utils/httpException");

const add = async (data) => {
  const existingSemester = await SemesterData.findOneByField({
    name: data.name,
  });
  if (existingSemester)
    throw new HttpException(400, "duplicateData", "semester");
  const res = await SemesterData.add(data);
  return res;
};

const update = async (data, id) => {
  const existingSemester = await SemesterData.findOneByField({ id: id });
  if (!existingSemester) throw new HttpException(400, "notFound", "semester");
  const updatedSemester = { ...data, ...existingSemester };
  const res = await SemesterData.update(updatedSemester, id);
  return res;
};

const getAll = async () => {
  const res = await SemesterData.fetchAll();
  return res;
};

const getById = async (id) => {
  const res = await SemesterData.fetchById(id);
  return res;
};

const remove = async (id) => {
  const res = await SemesterData.remove(id);
  return res;
};

module.exports = { add, update, getAll, getById, remove };

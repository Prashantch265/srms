const SectionData = require("../../data/master-configuration/section.data");
const HttpException = require("../../utils/httpException");

const add = async (data) => {
  const existingSection = await SectionData.findOneByField({ name: data.name });
  if (existingSection) throw new HttpException(400, "duplicateData", "section");
  const res = await SectionData.add(data);
  return res;
};

const update = async (data, id) => {
  const existingSection = await SectionData.findOneByField({ id: id });
  if (!existingSection) throw new HttpException(400, "notFound", "section");
  const updatedSection = { ...data, ...existingSection };
  const res = await SectionData.update(updatedSection, id);
  return res;
};

const findAll = async () => {
  const res = await SectionData.fetchAll();
  return res;
};

const findById = async (id) => {
  const res = await SectionData.findOneByField({ id: id });
  return res;
};

const remove = async (id) => {
  const res = await SectionData.remove(id);
  return res;
};

module.exports = { add, update, findAll, findById, remove };

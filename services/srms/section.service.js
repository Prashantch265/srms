const SectionData = require("../../data/srms/section.data");
const { errorResponse, successResponse } = require("../../utils");

const add = async (data) => {
  const existingSection = await SectionData.findOneByField({ name: data.name });
  if (existingSection) return errorResponse(400, "duplicateData", "section");
  const res = await SectionData.add(data);
  return successResponse(200, res, "create", "section");
};

const update = async (data, id) => {
  const existingSection = await SectionData.findOneByField({ id: id });
  if (!existingSection) return errorResponse(400, "notFound", "section");
  const updatedSection = { ...data, ...existingSection };
  const res = await SectionData.update(updatedSection, id);
  return successResponse(200, res, "update", "section");
};

const findAll = async () => {
  const res = await SectionData.fetchAll();
  return successResponse(200, res, "fetch", "section");
};

const findById = async (id) => {
  const res = await SectionData.findOneByField({ id: id });
  return successResponse(200, res, "fetch", "section");
};

const remove = async (id) => {
  const res = await SectionData.remove(id);
  return successResponse(200, res, "delete", "section");
};

module.exports = { add, update, findAll, findById, remove };

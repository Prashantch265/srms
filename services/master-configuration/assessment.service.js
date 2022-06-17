const AssessmentData = require("../../data/master-configuration/assessment.data");
const HttpException = require("../../utils/httpException");

const add = async (data) => {
  const existingAssessment = await AssessmentData.findOneByField({
    name: data.name,
  });
  if (existingAssessment)
    throw new HttpException(400, "duplicateData", "assessment");

  const res = await AssessmentData.add(data);
  return res;
};

const update = async (data, id) => {
  const existingAssessment = await AssessmentData.findOneByField({ id: id });
  if (!existingAssessment)
    throw new HttpException(400, "notFound", "assessment");

  const updatedAssessment = { ...data, ...existingAssessment };
  const res = await AssessmentData.update(updatedAssessment, id);
  return res;
};

const getAll = async () => {
  const res = await AssessmentData.fetchAll();
  return res;
};

const getById = async (id) => {
  const res = await AssessmentData.findOneByField({ id: id });
  return res;
};

const remove = async (id) => {
  const res = await AssessmentData.remove(id);
  return res;
};

module.exports = { add, update, getAll, getById, remove };

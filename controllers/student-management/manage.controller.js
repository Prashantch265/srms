const StudentService = require("../../services/student-management/students.service");
const { successResponse } = require("../../utils");

const updateSemester = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await StudentService.addMappingSemesterStudent(data);
    return successResponse(res, resData, "update", "semester");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resData = await StudentService.getDataFromMapping();
    return successResponse(res, resData, "fetch", "student");
  } catch (error) {
    next(error);
  }
};

const getByBatch = async (req, res, next) => {
  try {
    const batchId = req.params.id;
    const resData = await StudentService.getDataFromMappingByBatch(batchId);
    return successResponse(res, resData, "fetch", "student");
  } catch (error) {
    next(error);
  }
};

module.exports = { updateSemester, getAll, getByBatch };

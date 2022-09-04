const TeacherService = require("../../services/teacher-management/teachers.service");
const { successResponse } = require("../../utils");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await TeacherService.manageTeacher(data);
    return successResponse(res, resData, "create", "mapping");
  } catch (error) {
    next(error);
  }
};

const getMappingData = async (req, res, next) => {
  try {
    const semId = req.params.id;
    if (semId) {
      const resData = await TeacherService.getBySemester(semId);
      return successResponse(res, resData, "fetch", "mapping");
    }
    const resData = await TeacherService.getAllMapping();
    return successResponse(res, resData, "fetch", "mapping");
  } catch (error) {
    next(error);
  }
};

module.exports = { add, getMappingData };

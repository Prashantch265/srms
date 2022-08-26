const StudentService = require("../../services/student-management/students.service");
const successResponse = require("../../utils");

const updateSection = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resData = await StudentService.updateDetail(data, id);
    return successResponse(res, resData, "update", "student");
  } catch (error) {
    next(error);
  }
};

const updateSemester = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await StudentService.addMappingSemesterStudent(data);
    return successResponse(res, resData, "update", "semester");
  } catch (error) {
    next(error);
  }
};

module.exports = { updateSection, updateSemester };

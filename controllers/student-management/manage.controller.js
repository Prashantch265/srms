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

module.exports = { updateSemester };

const ExaminationScheduleService = require("../../services/schedule-management/examination-schedule");
const { successResponse } = require("../../utils/");

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await ExaminationScheduleService.add(data);
    return successResponse(res, resData, "create", "schedule");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const resData = await ExaminationScheduleService.getAll();
    return successResponse(res, resData, "fetch", "schedule");
  } catch (error) {
    next(error);
  }
};

const getByAssessment = async (req, res, next) => {
  try {
    const assessmentId = req.params.id;
    const resData = await ExaminationScheduleService.getByAssessment(
      assessmentId
    );
    return successResponse(res, resData, "fetch", "schedule");
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await ExaminationScheduleService.remove(data);
    return successResponse(res, resData, "fetch", "schedule");
  } catch (error) {
    next(error);
  }
};

module.exports = { add, getAll, getByAssessment, remove };

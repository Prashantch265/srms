const HelperService = require("../../services/report-management/helper.service");
const httpContext = require("express-http-context");
const { successResponse } = require("../../utils");

const getSemester = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const resData = await HelperService.getSemester(userId);
    return successResponse(res, resData, "fetch", "semester");
  } catch (error) {
    next(error);
  }
};

const getSection = async (req, res, next) => {
  try {
    const semesterId = req.query.semId;
    const { userId } = httpContext.get("user");
    const resData = await HelperService.getSection(semesterId, userId);
    return successResponse(res, resData, "fetch", "section");
  } catch (error) {
    next(error);
  }
};

const getSubject = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const sectionId = req.query.secId;
    const resData = await HelperService.getSubject(sectionId, userId);
    return successResponse(res, resData, "fetch", "subject");
  } catch (error) {
    next(error);
  }
};

const getStudentList = async (req, res, next) => {
  try {
    const semesterId = req.query.semId;
    const sectionId = req.query.secId;
    const resData = await HelperService.getStudentList(semesterId, sectionId);
    return successResponse(res, resData, "fetch", "student-list");
  } catch (error) {
    next(error);
  }
};

module.exports = { getSemester, getSection, getSubject, getStudentList };

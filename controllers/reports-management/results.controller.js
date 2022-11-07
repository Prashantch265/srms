const ResultService = require("../../services/report-management/results.service");
const httpContext = require("express-http-context");
const { successResponse } = require("../../utils");

const addResult = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const data = req.body;
    const resData = await ResultService.addResult(data, userId);
    return successResponse(res, resData, "stored", "result");
  } catch (error) {
    next(error);
  }
};

const publishResult = async (req, res, next) => {
  try {
    const assessmentId = req.query.assessmentId;
    const semId = req.query.semId;
    const resData = await ResultService;
    return successResponse(res, resData, "publish", "results");
  } catch (error) {
    next(error);
  }
};

module.exports = { addResult, publishResult };

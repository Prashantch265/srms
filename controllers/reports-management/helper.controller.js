const HelperService = require("../../services/report-management/helper.service");
const httpContext = require("express-http-context");

const getSection = async (req, res, next) => {
  try {
    const semesterId = req.query.semId;
    const { userId } = httpContext.get("user");
    const resData = await HelperService.getSection(semesterId, userId);
  } catch (error) {
    next(error);
  }
};

const get

module.exports = { getSection };

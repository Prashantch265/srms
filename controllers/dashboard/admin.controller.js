const AdminDashboardService = require("../../services/dashboard/admin.service");
const { successResponse } = require("../../utils/index");

const getAllCountData = async (req, res, next) => {
  try {
    const resData = await AdminDashboardService.getAllCountData();
    return successResponse(res, resData, "fetch", "data");
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCountData };

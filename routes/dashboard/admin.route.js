const AdminDashboardController = require("../../controllers/dashboard/admin.controller");

module.exports = (router) => {
  router
    .route("/get-all-count-data")
    .get(AdminDashboardController.getAllCountData);
};

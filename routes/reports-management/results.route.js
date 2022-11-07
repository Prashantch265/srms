const ResultController = require("../../controllers/reports-management/results.controller");

module.exports = (router) => {
  router.route("/examination-result").post(ResultController.addResult);

  router.route("/examination-result").patch();
};

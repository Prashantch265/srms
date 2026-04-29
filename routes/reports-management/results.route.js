const express = require("express");
const router = express.Router();
const resultsController = require("../../controllers/reports-management/results.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");

module.exports = (app) => {
  // Area 3: Transactional Integrity bounds applied here
  router.post("/bulk", authMiddleware, resultsController.addBulkResults);

  router.get("/:studentId", authMiddleware, resultsController.getResults);

  // Area 4: O(n) Algorithmic computation applied here
  router.post(
    "/generate-batch-report",
    authMiddleware,
    resultsController.generateBatchReport
  );

  // Priority 2: Asynchronous Message Queue / Background Worker trigger
  router.post(
    "/dispatch-reports",
    authMiddleware,
    resultsController.dispatchBatchReports
  );

  app.use("/api/v1/results", router);
};

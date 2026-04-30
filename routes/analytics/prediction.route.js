const express = require("express");
const router = express.Router();
const predictionController = require("../../controllers/analytics/prediction.controller");
const { authMiddleware } = require("../../middlewares/auth.middleware");

// Using standard dependency injection for the app routing
module.exports = (app) => {
  // Secured route requiring authentication
  router.get(
    "/:studentId",
    authMiddleware,
    predictionController.getStudentPrediction
  );

  app.use("/analytics/predictions", router);
};

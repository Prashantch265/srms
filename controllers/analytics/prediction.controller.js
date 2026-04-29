const predictionService = require("../../services/analytics/prediction.service");
const { successResponse, errorResponse } = require("../../utils");

const getStudentPrediction = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    if (!studentId) {
      return res
        .status(400)
        .json(
          errorResponse(400, "Student ID is required for prediction analysis.")
        );
    }

    const predictionData = await predictionService.generateStudentPrediction(
      studentId
    );

    return res
      .status(200)
      .json(
        successResponse(
          200,
          "Predictive analytics generated successfully",
          predictionData
        )
      );
  } catch (error) {
    if (error.message.includes("No historical data")) {
      return res.status(404).json(errorResponse(404, error.message));
    }
    next(error);
  }
};

module.exports = {
  getStudentPrediction,
};

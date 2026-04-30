const { Result, Subject } = require("../../database/models");
const { logger } = require("../../utils/logger");

/**
 * ABSTRACT ALIGNMENT: Predictive Analytics & Algorithmic Logic
 * Implements a pure Linear Regression (Ordinary Least Squares) algorithm
 * to predict a student's future GPA based on historical temporal data.
 * Time Complexity: O(n) where n is the number of semesters.
 */
const calculateLinearRegression = (historicalGPAs) => {
  const n = historicalGPAs.length;

  if (n === 0) return null;
  // If only one semester of data exists, we cannot establish a linear trend.
  if (n === 1)
    return {
      historical: historicalGPAs,
      trend: "Insufficient Data",
      predictedGPA: historicalGPAs[0],
    };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  // x represents the chronological semester index (1, 2, 3...)
  // y represents the actual GPA achieved in that semester
  for (let i = 0; i < n; i++) {
    const x = i + 1;
    const y = historicalGPAs[i];

    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  // Calculate the slope (m) and y-intercept (b) for the line of best fit: y = mx + b
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Predict the GPA for the next chronological semester (n + 1)
  const nextSemesterX = n + 1;
  let predictedGPA = slope * nextSemesterX + intercept;

  // Clamp the prediction within realistic academic bounds (0.0 to 4.0 scale)
  predictedGPA = Math.max(0.0, Math.min(4.0, predictedGPA));

  return {
    historical: historicalGPAs,
    trend: slope > 0.05 ? "Improving" : slope < -0.05 ? "Declining" : "Stable",
    slope: parseFloat(slope.toFixed(4)),
    predictedGPA: parseFloat(predictedGPA.toFixed(2)),
  };
};

/**
 * Fetches a student's raw grades, groups them chronologically by semester,
 * calculates the GPA for each period, and runs the predictive regression.
 */
const generateStudentPrediction = async (studentId) => {
  try {
    // 1. Fetch all historical results with their associated subject metadata (for credits and semester context)
    const results = await Result.findAll({
      where: { student_id: studentId },
      include: [
        {
          model: Subject,
          attributes: ["id", "semester_id"], // Assuming credit_hours defaults to 3 if not present in your schema
        },
      ],
      order: [[Subject, "semester_id", "ASC"]], // Ensure chronological ordering
      raw: true,
      nest: true,
    });

    if (!results || results.length === 0) {
      throw new Error("No historical data available for this student.");
    }

    // 2. Group results by semester to compute historical GPAs
    const semesterMap = new Map();

    results.forEach((row) => {
      const semId = row["Subject.semester_id"];
      if (!semesterMap.has(semId)) {
        semesterMap.set(semId, { totalPoints: 0, totalCredits: 0 });
      }

      const current = semesterMap.get(semId);
      const credits = 3; // Standardize to 3 credits for this projection

      current.totalPoints += row.score * credits;
      current.totalCredits += credits;
    });

    // 3. Extract the chronological GPAs into a flat array
    const historicalGPAs = [];
    semesterMap.forEach((data) => {
      // Assuming a percentage score out of 100, converting to a 4.0 scale (score / 25)
      const gpa =
        data.totalCredits > 0 ? data.totalPoints / data.totalCredits / 25 : 0;
      historicalGPAs.push(parseFloat(gpa.toFixed(2)));
    });

    // 4. Feed data into the O(n) algorithmic prediction engine
    const predictionMetrics = calculateLinearRegression(historicalGPAs);

    return predictionMetrics;
  } catch (error) {
    logger.error(`Prediction Engine Error for student ${studentId}:`, error);
    throw error;
  }
};

module.exports = {
  calculateLinearRegression,
  generateStudentPrediction,
};

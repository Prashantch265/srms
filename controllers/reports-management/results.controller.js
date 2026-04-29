const resultService = require("../../services/report-management/results.service");
const { successResponse, errorResponse } = require("../../utils");
const db = require("../../lib/sequelize"); // Required for decoupled data fetching
const dispatcherService = require("../../services/report-management/report-dispatcher.service");

const addBulkResults = async (req, res, next) => {
  try {
    const { results } = req.body;

    if (!results || !Array.isArray(results)) {
      return res
        .status(400)
        .json(errorResponse(400, "Invalid results format. Expected an array."));
    }

    await resultService.upsertBulkResults(results);

    return res
      .status(201)
      .json(successResponse(201, "Results recorded successfully"));
  } catch (error) {
    // ABSTRACT ALIGNMENT: Transactional Integrity (Integrity Pass Area 3)
    if (error.name === "SerializationFailure") {
      return res.status(409).json(errorResponse(409, error.message));
    }
    next(error);
  }
};

const getResults = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const data = await resultService.getResultsByStudent(studentId);

    return res
      .status(200)
      .json(successResponse(200, "Results fetched successfully", data));
  } catch (error) {
    next(error);
  }
};

/**
 * ABSTRACT ALIGNMENT: Asynchronous Data Processing (Area 4)
 * Prevents thread-starvation during CPU-intensive report generation
 * by decoupling data retrieval using Promise.all concurrent I/O.
 */
const generateBatchReport = async (req, res, next) => {
  try {
    const { batch_id, semester_id } = req.body;

    if (!batch_id || !semester_id) {
      return res
        .status(400)
        .json(errorResponse(400, "batch_id and semester_id are required"));
    }

    // 1. Decoupled Asynchronous Data Retrieval (Concurrent I/O)
    // We execute these three heavy queries concurrently instead of sequentially
    const [students, subjects, results] = await Promise.all([
      db.Student.findAll({ where: { batch_id: batch_id }, raw: true }),
      db.Subject.findAll({ where: { semester_id: semester_id }, raw: true }),
      db.Result.findAll({
        include: [
          {
            model: db.Student,
            where: { batch_id: batch_id },
            attributes: [],
          },
        ],
        raw: true,
      }),
    ]);

    // 2. Non-blocking handoff to O(n) algorithmic engine
    // Since all data is fully loaded into RAM, the hash map computations run instantaneously
    const report = resultService.calculateSemesterResults(
      students,
      subjects,
      results
    );

    return res
      .status(200)
      .json(
        successResponse(200, "Batch report generated successfully", report)
      );
  } catch (error) {
    next(error);
  }
};

/**
 * ABSTRACT ALIGNMENT: Asynchronous Data Processing
 * Instantly acknowledges the request and offloads CPU/Network-heavy operations
 * to the background TaskQueue.
 */
const dispatchBatchReports = async (req, res, next) => {
  try {
    const { batch_id, semester_id } = req.body;
    if (!batch_id || !semester_id) {
      return res
        .status(400)
        .json(errorResponse(400, "batch_id and semester_id are required"));
    }

    dispatcherService.dispatchBatchReportsBackground(batch_id, semester_id);
    return res
      .status(202)
      .json(
        successResponse(
          202,
          "Report generation and email dispatch started in the background."
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBulkResults,
  getResults,
  generateBatchReport,
  dispatchBatchReports,
};

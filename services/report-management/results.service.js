const db = require("../../lib/sequelize");
const { Transaction } = require("sequelize");
const { logger } = require("../../utils/logger");

/**
 * ABSTRACT ALIGNMENT: Transactional Integrity (Area 3)
 * Executes a callback within a strict SERIALIZABLE transaction.
 * Implements an exponential backoff retry mechanism to automatically recover
 * from PostgreSQL '40001' (serialization_failure) race condition errors.
 */
const executeSerializableTransaction = async (callback, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await db.sequelize.transaction(
        { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
        async (t) => {
          return await callback(t);
        }
      );
    } catch (error) {
      // 40001 is the standard SQLSTATE for serialization failure in Postgres
      if (error.original && error.original.code === "40001") {
        logger.warn(
          `Serialization failure (race condition prevented). Retrying... Attempt ${attempt} of ${maxRetries}`
        );

        if (attempt === maxRetries) {
          logger.error("Transaction failed permanently after maximum retries.");
          const conflictError = new Error(
            "High concurrency prevented record update. Please try again."
          );
          conflictError.name = "SerializationFailure";
          throw conflictError;
        }

        // Non-blocking exponential backoff before retry
        await new Promise((resolve) =>
          setTimeout(resolve, 50 * Math.pow(2, attempt))
        );
        continue;
      }
      throw error;
    }
  }
};

/**
 * ABSTRACT ALIGNMENT: Critical Grade-Entry Module (Area 3)
 */
const upsertBulkResults = async (resultsData) => {
  return await executeSerializableTransaction(async (t) => {
    const promises = resultsData.map(async (result) => {
      const { student_id, assessment_id, subject_id, score, remarks } = result;
      return await db.Result.upsert(
        { student_id, assessment_id, subject_id, score, remarks },
        { transaction: t, returning: true }
      );
    });

    return await Promise.all(promises);
  });
};

const getResultsByStudent = async (student_id) => {
  return await db.Result.findAll({ where: { student_id } });
};

/**
 * ABSTRACT ALIGNMENT: Algorithmic Logic ($O(n)$ Complexity) (Area 4)
 * Calculates semester GPAs using Hash Maps to achieve O(n) time complexity
 * instead of nested arrays/loops O(n^2), preventing event-loop blocking.
 */
const calculateSemesterResults = (students, subjects, results) => {
  // O(S) - Create Subject Hash Map for O(1) lookups
  const subjectMap = new Map();
  subjects.forEach((sub) => subjectMap.set(sub.id, sub));

  // O(R) - Create Results Hash Map grouped by Student for O(1) lookups
  const studentResultsMap = new Map();
  results.forEach((res) => {
    if (!studentResultsMap.has(res.student_id)) {
      studentResultsMap.set(res.student_id, []);
    }
    studentResultsMap.get(res.student_id).push(res);
  });

  // O(N) - Single pass through students to aggregate GPA
  const computedReports = students.map((student) => {
    const studentMarks = studentResultsMap.get(student.id) || [];
    let totalPoints = 0;
    let totalCredits = 0;

    studentMarks.forEach((mark) => {
      const subject = subjectMap.get(mark.subject_id);
      // Default to 3 credits if not explicitly defined in the subject schema
      const credits =
        subject && subject.credit_hours ? subject.credit_hours : 3;

      totalPoints += mark.score * credits;
      totalCredits += credits;
    });

    // Safe division to prevent NaN on students with no marks
    const gpa =
      totalCredits > 0 ? (totalPoints / totalCredits / 25).toFixed(2) : 0;

    return {
      student_id: student.id,
      name: student.name,
      gpa: parseFloat(gpa),
      total_credits: totalCredits,
      processed_at: new Date().toISOString(),
    };
  });

  return computedReports;
};

module.exports = {
  executeSerializableTransaction,
  upsertBulkResults,
  getResultsByStudent,
  calculateSemesterResults,
};

const db = require("../../lib/sequelize");
const { logger } = require("../../utils/logger");
const mailer = require("../../utils/node-mailer");
const reportTaskQueue = require("../../lib/task-queue");
const {
  calculateSemesterResults,
} = require("../report-management/results.service");

/**
 * ABSTRACT ALIGNMENT: Asynchronous Data Processing
 * Simulates CPU-heavy PDF generation and dispatches it via email.
 */
const generateAndEmailReport = async (studentReport, parentEmail) => {
  return new Promise((resolve) => {
    // Simulating CPU-intensive PDF buffer generation (e.g., using pdfkit/puppeteer)
    const dummyPdfBuffer = Buffer.from(
      `%PDF-1.4\n%Student: ${studentReport.name}\n%GPA: ${studentReport.gpa}`,
      "utf-8"
    );

    const mailOptions = {
      to: parentEmail,
      subject: `Academic Report Card: ${studentReport.name}`,
      template: "login-credential", // Reusing an existing template for demo purposes
      context: {
        userName: `Parent of ${studentReport.name}`,
        password: `View attached PDF for ${studentReport.name}'s performance. GPA: ${studentReport.gpa}`,
      },
      attachments: [
        {
          filename: `${studentReport.name}_Report_Card.pdf`,
          content: dummyPdfBuffer,
        },
      ],
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(
          `Failed to email report for ${studentReport.name}:`,
          error.message
        );
      } else {
        logger.info(
          `Successfully dispatched report card to ${parentEmail} for ${studentReport.name}`
        );
      }
      resolve(); // Always resolve so the queue worker is freed
    });
  });
};

/**
 * Orchestrates the gathering of data and enqueues individual tasks
 * to prevent blocking the main HTTP request thread.
 */
const dispatchBatchReportsBackground = async (batchId, semesterId) => {
  try {
    logger.info(
      `Initiating background dispatch for Batch: ${batchId}, Sem: ${semesterId}`
    );

    // Decoupled concurrent data fetching (Area 4 Optimization)
    const [students, subjects, results] = await Promise.all([
      db.students.findAll({ where: { batch_id: batchId }, raw: true }),
      db.subjects.findAll({ where: { semester_id: semesterId }, raw: true }),
      db.examination_results.findAll({
        include: [
          { model: db.students, where: { batch_id: batchId }, attributes: [] },
        ],
        raw: true,
      }),
    ]);

    // O(n) algorithmic report calculation
    const reports = calculateSemesterResults(students, subjects, results);

    // Enqueue each student's report generation into the Bounded Task Queue
    reports.forEach((report) => {
      const studentEntity = students.find((s) => s.id === report.student_id);
      const parentEmail = studentEntity ? studentEntity.parents_email : null;

      if (parentEmail) {
        reportTaskQueue.enqueue(async () => {
          await generateAndEmailReport(report, parentEmail);
        });
      }
    });

    logger.info(
      `Successfully enqueued ${reports.length} report dispatch tasks.`
    );
  } catch (error) {
    logger.error("Failed to execute background report dispatch:", error);
  }
};

module.exports = {
  dispatchBatchReportsBackground,
};

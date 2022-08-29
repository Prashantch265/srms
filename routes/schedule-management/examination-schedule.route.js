const ExaminationScheduleController = require("../../controllers/schedule-management/examination-schedule");

module.exports = (router) => {
  router.route("/examination-schedule").post(ExaminationScheduleController.add);

  router
    .route("/examination-schedule")
    .get(ExaminationScheduleController.getAll);

  router
    .route("/examination-schedule")
    .put(ExaminationScheduleController.remove);

  router
    .route("/examination-schedule/:id")
    .get(ExaminationScheduleController.getByAssessment);
};

const ManageTeacherController = require("../../controllers/teacher-management/manage.controller");

module.exports = (router) => {
  router.route("/manage-teacher").post(ManageTeacherController.add);

  router.route("/manage-teacher").get(ManageTeacherController.getMappingData);

  router
    .route("/manage-teacher/:id")
    .get(ManageTeacherController.getMappingData);
};

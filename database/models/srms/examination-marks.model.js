const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assessmentId: {
      field: "assessment_id",
      type: dataTypes.INTEGER,
      references: {
        model: "assessments",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    subId: {
      field: "subject_id",
      type: dataTypes.INTEGER,
      references: {
        model: "subjects",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    studentId: {
      field: "student_id",
      type: dataTypes.INTEGER,
      references: {
        model: "students",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    obtainedMarks: {
      field: "obtained_marks",
      type: dataTypes.DECIMAL(4, 2),
    },
    remarks: {
      field: "remarks",
      type: dataTypes.ENUM(["pass", "fail", "absent"]),
      allowNull: false,
    },
    publish: {
      field: "publish",
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  const examinationResults = { ...obj, ...CommonEntity };

  const ExaminationResults = sequelize.define(
    "examination_results",
    examinationResults,
    { freezeTableName: true }
  );

  return ExaminationResults;
};

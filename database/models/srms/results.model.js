const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    assessmentId: {
      field: "assessment_id",
      type: dataTypes.INTEGER,
      references: {
        model: "assessments",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    semesterId: {
      field: "semester_id",
      type: dataTypes.INTEGER,
      references: {
        model: "semester",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    subjectId: {
      field: "subject_id",
      type: dataTypes.INTEGER,
      references: {
        model: "subjects",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    score: {
      field: "score",
      type: dataTypes.DECIMAL(4, 2),
    },
    remarks: {
      field: "remarks",
      type: dataTypes.ENUM(["pass", "fail", "absent"]),
    },
  };

  const result = { ...obj, ...CommonEntity };

  const Result = sequelize.define("results", result);

  return Result;
};

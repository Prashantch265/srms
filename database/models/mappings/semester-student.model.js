const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    semId: {
      field: "semester_id",
      type: dataTypes.INTEGER,
      references: {
        model: "semester",
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
    batchId: {
      field: "batch_id",
      type: dataTypes.INTEGER,
      references: {
        model: "batch",
        key: "id",
      },
      onDelete: "cascade",
    },
  };

  const semester_student = { ...obj, ...CommonEntity };

  const SemesterSection = sequelize.define(
    "semester_student",
    semester_student,
    { freezeTableName: true }
  );

  return SemesterSection;
};

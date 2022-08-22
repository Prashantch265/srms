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
    secId: {
      field: "section_id",
      type: dataTypes.INTEGER,
      references: {
        model: "section",
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
  };

  const semester_section_student = { ...obj, ...CommonEntity };

  const SemesterSection = sequelize.define(
    "semester_section_student",
    semester_section_student,
    { freezeTableName: true }
  );

  return SemesterSection;
};

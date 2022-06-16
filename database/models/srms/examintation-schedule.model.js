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
    subjectId: {
      field: "subject_id",
      type: dataTypes.INTEGER,
      references: {
        model: "subjects",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    date: {
      field: "date",
      type: dataTypes.STRING,
      allowNull: false,
    },
    time: {
      field: "time",
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  const practicalSchedule = { ...obj, ...CommonEntity };

  const PracticalSchedule = sequelize.define(
    "practical_schedule",
    practicalSchedule,
    { freezeTableName: true }
  );

  return PracticalSchedule;
};

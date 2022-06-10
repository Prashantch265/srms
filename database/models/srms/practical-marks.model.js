const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
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
  };

  const practicalMarks = { ...obj, ...CommonEntity };

  const PracticalMarks = sequelize.define("practical_marks", practicalMarks);

  return PracticalMarks;
};

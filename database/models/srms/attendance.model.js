const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      field: "date",
      type: dataTypes.STRING,
      allowNull: false,
    },
    status: {
      field: "status",
      type: dataTypes.ENUM(["present", "absent", "on_leave"]),
      defaultValue: "absent",
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
    subjectId: {
      field: "subject_id",
      type: dataTypes.INTEGER,
      references: {
        model: "subjects",
        key: "id",
      },
      onDelete: "cascade",
    },
    teacherId: {
      field: "teacher_id",
      type: dataTypes.INTEGER,
      references: {
        model: "teachers",
        key: "id",
      },
    },
  };

  const attendance = { ...obj, ...CommonEntity };

  const Attendance = sequelize.define("attendance", attendance, {
    freezeTableName: true,
  });

  return Attendance;
};

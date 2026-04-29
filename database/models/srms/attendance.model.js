module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "attendance",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("present", "absent", "late"),
        allowNull: false,
      },
    },
    {
      tableName: "attendance",
      // ABSTRACT ALIGNMENT: Time-series B-tree indexes for fast attendance reporting
      indexes: [
        {
          name: "attendance_student_date_idx",
          fields: ["student_id", "date"],
        },
        {
          name: "attendance_subject_idx",
          fields: ["subject_id"],
        },
      ],
    }
  );

  Attendance.associate = function (models) {
    Attendance.belongsTo(models.students, {
      foreignKey: "student_id",
      onDelete: "CASCADE",
    });
    Attendance.belongsTo(models.subjects, {
      foreignKey: "subject_id",
      onDelete: "CASCADE",
    });
  };

  return Attendance;
};

module.exports = (sequelize, DataTypes) => {
  const ExaminationMarks = sequelize.define(
    "examination_marks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      obtained_marks: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.ENUM("excellent", "good", "average", "poor", "fail"),
      },
    },
    {
      tableName: "examination_marks",
      // ABSTRACT ALIGNMENT: Query optimization for grade aggregations
      indexes: [
        {
          name: "exam_marks_student_assessment_idx",
          fields: ["student_id", "assessment_id"],
        },
        {
          name: "exam_marks_subject_idx",
          fields: ["sub_id"],
        },
      ],
    }
  );

  ExaminationMarks.associate = function (models) {
    ExaminationMarks.belongsTo(models.students, {
      foreignKey: "student_id",
      onDelete: "CASCADE",
    });
    ExaminationMarks.belongsTo(models.assessments, {
      foreignKey: "assessment_id",
      onDelete: "RESTRICT",
    });
    ExaminationMarks.belongsTo(models.subjects, {
      foreignKey: "sub_id",
      onDelete: "RESTRICT",
    });
  };

  return ExaminationMarks;
};

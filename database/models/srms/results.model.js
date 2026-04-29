module.exports = (sequelize, DataTypes) => {
  const Results = sequelize.define(
    "examination_results",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "results",
      // ABSTRACT ALIGNMENT: Explicit B-tree indexes for O(log n) lookups
      indexes: [
        {
          name: "results_student_assessment_idx",
          fields: ["student_id", "assessment_id"], // High cardinality compound index
        },
        {
          name: "results_subject_idx",
          fields: ["subject_id"],
        },
      ],
    }
  );

  Results.associate = function (models) {
    // ABSTRACT ALIGNMENT: Normalization edge case handling
    Results.belongsTo(models.students, {
      foreignKey: "student_id",
      onDelete: "CASCADE", // Prevents orphaned result data if a student record is dropped
    });
    Results.belongsTo(models.assessments, {
      foreignKey: "assessment_id",
      onDelete: "RESTRICT", // Prevents dropping an assessment that has active result dependencies
    });
    Results.belongsTo(models.subjects, {
      foreignKey: "subject_id",
      onDelete: "RESTRICT",
    });
  };

  return Results;
};

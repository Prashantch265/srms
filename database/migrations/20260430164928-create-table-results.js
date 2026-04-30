"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Prevents orphaned result data
      },
      assessment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "assessments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT", // Prevents deleting an assessment that has grades
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "subjects", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER, allowNull: true },
      updated_by: { type: Sequelize.INTEGER, allowNull: true },
    });

    // CS Theory: Physical B-Tree Index Generation for O(log n) lookups
    await queryInterface.addIndex("results", ["student_id", "assessment_id"], {
      name: "results_student_assessment_idx",
      using: "BTREE",
    });

    await queryInterface.addIndex("results", ["subject_id"], {
      name: "results_subject_idx",
      using: "BTREE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("results");
  },
};

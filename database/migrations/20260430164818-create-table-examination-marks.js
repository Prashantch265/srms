"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("examination_marks", {
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
        onDelete: "CASCADE",
      },
      assessment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "assessments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      sub_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "subjects", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      obtained_marks: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.ENUM("excellent", "good", "average", "poor", "fail"),
        allowNull: true,
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER, allowNull: true },
      updated_by: { type: Sequelize.INTEGER, allowNull: true },
    });

    await queryInterface.addIndex(
      "examination_marks",
      ["student_id", "assessment_id"],
      {
        name: "exam_marks_student_assessment_idx",
        using: "BTREE",
      }
    );

    await queryInterface.addIndex("examination_marks", ["sub_id"], {
      name: "exam_marks_subject_idx",
      using: "BTREE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("examination_marks");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_examination_marks_remarks";'
    );
  },
};

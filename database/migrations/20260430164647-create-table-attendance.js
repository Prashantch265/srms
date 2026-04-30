"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("attendance", {
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
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "subjects", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("present", "absent", "late"),
        allowNull: false,
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER, allowNull: true },
      updated_by: { type: Sequelize.INTEGER, allowNull: true },
    });

    // Time-series indexing for fast dashboard queries
    await queryInterface.addIndex("attendance", ["student_id", "date"], {
      name: "attendance_student_date_idx",
      using: "BTREE",
    });

    await queryInterface.addIndex("attendance", ["subject_id"], {
      name: "attendance_subject_idx",
      using: "BTREE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("attendance");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_attendance_status";'
    );
  },
};

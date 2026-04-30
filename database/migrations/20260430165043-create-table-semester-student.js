"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("semester_student", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "semester", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "batch", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // --- COMMON JS FIELDS ---
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    await queryInterface.addIndex(
      "semester_student",
      ["sem_id", "student_id", "batch_id"],
      {
        name: "semester_student_composite_idx",
        unique: true,
        using: "BTREE",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("semester_student");
  },
};

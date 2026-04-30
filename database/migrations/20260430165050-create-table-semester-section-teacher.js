"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("semester_section", {
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
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "section", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "teachers", key: "id" },
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
      "semester_section",
      ["sem_id", "section_id", "teacher_id"],
      {
        name: "semester_section_teacher_idx",
        unique: true,
        using: "BTREE",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("semester_section");
  },
};

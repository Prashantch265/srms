"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("assessment_marking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      starting_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ending_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assessment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "assessments", key: "id" },
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
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
      created_by: { type: Sequelize.INTEGER, allowNull: true },
      updated_by: { type: Sequelize.INTEGER, allowNull: true },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("assessment_marking");
  },
};

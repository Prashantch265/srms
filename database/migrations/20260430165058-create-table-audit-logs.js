"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("audit_logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      entity_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      action: {
        type: Sequelize.ENUM("INSERT", "UPDATE", "DELETE"),
        allowNull: false,
      },
      old_values: {
        type: Sequelize.JSONB, // CS Theory: Unstructured data handling
        allowNull: true,
      },
      new_values: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      performed_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      // Note: intentionally omitting updated_at to enforce immutability
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("audit_logs");
    // Clean up the ENUM type from Postgres
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_audit_logs_action";'
    );
  },
};

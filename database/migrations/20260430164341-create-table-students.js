"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("students", {
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
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: "users", key: "user_name" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fathers_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mothers_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parents_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parents_phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      roll_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      batch_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "batch", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "section", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("students");
  },
};

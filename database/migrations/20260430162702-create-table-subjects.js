"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subjects", {
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
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      credit_hours: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 3,
      },
      semester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "semester", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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

    await queryInterface.addIndex("subjects", ["semester_id"], {
      name: "subjects_semester_idx",
      using: "BTREE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("subjects");
  },
};

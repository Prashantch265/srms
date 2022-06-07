'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        field: "user_id",
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      userName: {
        field: "user_name",
        type: dataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        field: "password",
        type: dataTypes.STRING,
        allowNull: false,
      }, isActive: {
        field: 'is_active',
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdBy: {
        field: "created_by",
        type: DataTypes.UUID,
      },
      updatedBy: {
        field: "updated_by",
        type: DataTypes.UUID,
      },
    })
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};

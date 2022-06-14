const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "user_id",
      type: dataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "cascade",
    },
    roleId: {
      field: "role_id",
      type: dataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "cascade",
    },
  };

  const userRole = { ...obj, ...CommonEntity };

  const UserRole = sequelize.define("user_role", userRole, {
    freezeTableName: true,
  });

  return UserRole;
};

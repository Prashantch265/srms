const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    moduleId: {
      field: "module_id",
      type: dataTypes.INTEGER,
      references: {
        model: "modules",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    privilegeId: {
      field: "privilege_id",
      type: dataTypes.INTEGER,
      references: {
        model: "privileges",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    screenId: {
      field: "screen_id",
      type: dataTypes.INTEGER,
      references: {
        model: "screens",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    roleId: {
      field: "role_id",
      type: dataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  };

  const rsmp = { ...obj, ...CommonEntity };

  const RSMP = sequelize.define("rsmp", rsmp, { freezeTableName: true });

  return RSMP;
};

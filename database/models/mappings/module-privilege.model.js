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
    method: {
      field: "method",
      type: dataTypes.STRING(10),
      allowNull: false,
    },
  };

  const modulePrivilege = { ...obj, ...CommonEntity };

  const ModulePrivilege = sequelize.define(
    "module_privielge",
    modulePrivilege,
    { freezeTableName: true }
  );

  return ModulePrivilege;
};

const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      field: "description",
      type: dataTypes.STRING(255),
    },
    code: {
      field: "code",
      type: dataTypes.STRING(30),
      allowNull: false,
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
  };

  const modules = { ...obj, ...CommonEntity };

  const Module = sequelize.define("modules", modules);

  return Module;
};

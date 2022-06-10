const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      field: "id",
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "name",
      type: dataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      field: "display_name",
      type: dataTypes.STRING,
    },
  };

  const batch = { ...obj, ...CommonEntity };

  const Batch = sequelize.define("batch", batch, { freezeTableName: true });

  return Batch;
};

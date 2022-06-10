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

  const section = { ...obj, ...CommonEntity };

  const Section = sequelize.define("section", section, {
    freezeTableName: true,
  });

  return Section;
};

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
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    shortName: {
      field: "short_name",
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    code: {
      field: "code",
      type: dataTypes.STRING(5),
      allowNull: false,
    },
  };

  const privilege = { ...obj, ...CommonEntity };

  const Privilege = sequelize.define("privileges", privilege);

  return Privilege;
};

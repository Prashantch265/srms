const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    privilegeName: {
      field: "name",
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT("tiny"),
    },
  };

  const privilege = { ...obj, ...CommonEntity };

  const Privilege = sequelize.define("privileges", privilege);

  return Privilege;
}
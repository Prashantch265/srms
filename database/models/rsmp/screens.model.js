const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    screenName: {
      field: "name",
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT("tiny"),
    },
  };

  const screen = { ...obj, ...CommonEntity };

  const Screen = sequelize.define("screens", screen);

  return Screen;
}
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
    description: {
      field: "description",
      type: dataTypes.TEXT("tiny"),
    },
  };

  const assessment = { ...obj, ...CommonEntity };

  const Assessment = sequelize.define("assessments", assessment);

  return Assessment;
};

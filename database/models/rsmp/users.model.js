const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
  const obj = {
    userId: {
      field: "user_id",
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      field: "user_name",
      type: dataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      field: "password",
      type: dataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      field: "profile_pic",
      type: dataTypes.STRING,
    },
    firstTimeLogin: {
      field: "first_time_login",
      type: dataTypes.BOOLEAN,
      defaultValue: true,
    },
  };

  const user = { ...obj, ...CommonEntity };
  const User = sequelize.define("users", user);

  return User;
};

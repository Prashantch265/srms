const CommonEntity = require('../common');

module.exports = (sequelize, dataTypes) => {
  const obj = {
    userId: {
      field: "user_id",
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    userName: {
      field: "user_name",
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      field: "password",
      type: dataTypes.STRING,
      allowNull: false,
    },
  }

  const user = { ...obj, ...CommonEntity }
  const User = sequelize.define("users", user);

  return User;
};

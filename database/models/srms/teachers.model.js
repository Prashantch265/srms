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
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    gender: {
      field: "gender",
      type: dataTypes.ENUM(["male", "female", "others"]),
      allowNull: false,
    },
    address: {
      field: "address",
      type: dataTypes.STRING(155),
      allowNull: false,
    },
    contactNo: {
      field: "contact_no",
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: "email",
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    type: {
      field: "employment_type",
      type: dataTypes.ENUM(["full-time", "part-time"]),
      allowNull: false,
    },
    userName: {
      field: "user_name",
      type: dataTypes.STRING,
      references: {
        model: "users",
        key: "user_name",
      },
      onDelete: "cascade",
    },
  };

  const teacher = { ...obj, ...CommonEntity };

  const Teacher = sequelize.define("teachers", teacher);

  return Teacher;
};

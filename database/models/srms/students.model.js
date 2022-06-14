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
      type: dataTypes.STRING(25),
      allowNull: false,
    },
    gender: {
      field: "gender",
      type: dataTypes.ENUM(["male", "female", "others"]),
      allowNull: false,
    },
    dob: {
      field: "date_of_birth",
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: "email",
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    contactNo: {
      field: "contact_no",
      type: dataTypes.STRING,
      allowNull: false,
    },
    fathersName: {
      field: "fathers_name",
      type: dataTypes.STRING(25),
      allowNull: false,
    },
    mothersName: {
      field: "mothers_name",
      type: dataTypes.STRING(25),
      allowNull: false,
    },
    guardiansName: {
      field: "guardians_name",
      type: dataTypes.STRING(25),
    },
    parentsEmail: {
      field: "parents_email",
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    fathersContactNo: {
      field: "fathers_contact_no",
      type: dataTypes.STRING,
      allowNull: false,
    },
    mothersContactNo: {
      field: "mothers_contact_no",
      type: dataTypes.STRING,
      allowNull: false,
    },
    guardianContactNo: {
      field: "guardians_contact_no",
      type: dataTypes.STRING,
    },
    batchId: {
      field: "batch_id",
      type: dataTypes.INTEGER,
      references: {
        model: "batch",
        key: "id",
      },
      onDelete: "cascade",
    },
    semesterId: {
      field: "semester_id",
      type: dataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: "semester",
        key: "id",
      },
      onDelete: "cascade",
    },
    sectionId: {
      field: "section_id",
      type: dataTypes.INTEGER,
      references: {
        model: "section",
        key: "id",
      },
      onDelete: "cascade",
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

  const student = { ...obj, ...CommonEntity };

  const Student = sequelize.define("students", student);

  return Student;
};

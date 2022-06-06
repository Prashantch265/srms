const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
    const obj = {
        id: {
            field: "id",
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fathersName: {
            field: "fathers_name",
            type: dataTypes.STRING(25),
            allowNull: false
        },
        mothersName: {
            field: "mothers_name",
            type: dataTypes.STRING(25),
            allowNull: false
        },
        email: {
            field: "email",
            type: dataTypes.STRING(30),
            allowNull: false
        },
        contactNo: {
            field: "contact_no",
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    const parent = {...obj, ...CommonEntity};

    const Parent = sequelize.define("parents", parent);

    return Parent;
}
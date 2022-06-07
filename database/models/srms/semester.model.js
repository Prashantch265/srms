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
        }
    };

    const semester = { ...obj, ...CommonEntity };

    const Semester = sequelize.define("semester", semester, { freezeTableName: true });

    return Semester;
}
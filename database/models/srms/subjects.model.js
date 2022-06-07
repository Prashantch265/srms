const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
    const obj = {
        id: {
            field: "id",
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: "name",
            type: dataTypes.STRING,
            allowNull: false
        },
        displayName: {
            field: "display_name",
            type: dataTypes.STRING,
            allowNull: false
        },
        code: {
            field: "code",
            type: dataTypes.STRING,
            allowNull: false
        },
        semId: {
            field: "semester_id",
            type: dataTypes.INTEGER,
            references: {
                model: "semester",
                key: "id",
            },
            onDelete: "cascade"
        }
    }

    const subject = { ...obj, ...CommonEntity };

    const Subject = sequelize.define("subjects", subject);

    return Subject;
}
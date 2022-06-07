const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
    const obj = {
        id: {
            field: "id",
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            field: "date",
            type: dataTypes.ARRAY(dataTypes.ARRAY(dataTypes.STRING)),
            allowNull: false,
        },
        status: {
            field: "status",
            type: dataTypes.ENUM(["present", "absent", "on_leave"]),
            allowNull: false
        },
        studentId: {
            field: "student_id",
            type: dataTypes.INTEGER,
            references: {
                model: "students",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        subjectId: {
            field: "subject_id",
            type: dataTypes.INTEGER,
            references: {
                model: "subjects",
                key: "id",
            },
            onDelete: "cascade"
        }
    };

    const attendance = { ...obj, ...CommonEntity };

    const Attendance = sequelize.define("attendance", attendance, { freezeTableName: true });

    return Attendance;
}
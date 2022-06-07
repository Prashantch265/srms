const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
    const obj = {
        semId: {
            field: "semester_id",
            type: dataTypes.INTEGER,
            references: {
                model: "semester",
                key: "id",
            },
            onDelete: "CASCADE"
        },
        secId: {
            field: "section_id",
            type: dataTypes.INTEGER,
            references: {
                model: "section",
                key: "id",
            },
            onDelete: "CASCADE"
        },
        teacherId: {
            field: "teacher_id",
            type: dataTypes.INTEGER,
            references: {
                model: "teachers",
                key: "id",
            },
            onDelete: "CASCADE"
        },
        subId: {
            field: "subject_id",
            type: dataTypes.INTEGER,
            references: {
                model: "subjects",
                key: "id",
            },
            onDelete: "CASCADE"
        }
    }

    const semester_section = { ...obj, ...CommonEntity };

    const SemesterSection = sequelize.define("semester_section", semester_section, { freezeTableName: true });

    return SemesterSection;
}
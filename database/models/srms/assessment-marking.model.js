const CommonEntity = require("../common");

module.exports = (sequelize, dataTypes) => {
    const obj = {
        id: {
            field: "id",
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        assessmentId: {
            field: "assessment_id",
            type: dataTypes.INTEGER,
            references: {
                model: "assessments",
                key: "id"
            },
            onDelete: "cascade"
        },
        subjectId: {
            field: "subject_id",
            type: dataTypes.INTEGER,
            references: {
                model: "subjects",
                key: "id"
            },
            onDelete: "cascade"
        },
        passMark: {
            field: "pass_mark",
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        fullMark: {
            field: "full_mark",
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    const assessmentMarking = { ...obj, ...CommonEntity };

    const AssessmentMarking = sequelize.define("assessment_marking", assessmentMarking);

    return AssessmentMarking;
}
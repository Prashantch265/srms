const db = require("../../lib/sequelize");
module.exports = {
  Role: db.roles,
  Privilege: db.privileges,
  Screen: db.screens,
  User: db.users,
  Student: db.students,
  Section: db.section,
  Batch: db.batch,
  Semester: db.semester,
  Subject: db.subjects,
  Result: db.results,
  Assessment: db.assessments,
  Teacher: db.teachers,
  PracticalSchedule: db.practical_schedule,
  PracticalMark: db.practical_marks,
  AssessmentMarking: db.assessment_marking,
  SemesterSection: db.semester_section,
};

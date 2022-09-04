const { QueryTypes } = require("sequelize/types");
const db = require("../../lib/sequelize");

const getSemesterQuery = `select distinct
jsonb_build_object('id', semester.id, 'name', semester.display_name) as "semesters"
from semester_section
inner join semester on semester.id = semester_section.semester_id and semester.is_active is true
where semester_section.is_active = true and semester_section.is_deleted = false and semester_section.teacher_id = $1`;

const getSectionQuery = `select
jsonb_build_object('id', section.id, 'name', section.display_name) as "sections"
from semester_section
inner join section on section.id = semester_section.section_id and section.is_active is true
where semester_section.is_active = true and semester_section.is_deleted = false and
semester_section.semester_id = $1 and semester_section.teacher_id = $2`;

const getSubjectQuery = `select
jsonb_build_object('id', subjects.id, 'name', subjects.name) as "subjects"
from semester_section
inner join subjects on subjects.id = semester_section.subject_id and subjects.is_active is true
where semester_section.is_active = true and semester_section.is_deleted = false and
semester_section.section_id = $1 and semester_section.teacher_id = $2`;

const getSemester = async (teacherId) => {
  const replacements = [teacherId];
  return await db.sequelize.query(getSemesterQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const getSection = async (semesterId, teacherId) => {
  const replacements = [semesterId, teacherId];
  return await db.sequelize.query(getSectionQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const getSubject = async (sectionId, teacherId) => {
  const replacements = [sectionId, teacherId];
  return await db.sequelize.query(getSubjectQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

module.exports = { getSemester, getSection, getSubject };

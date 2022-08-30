const { SemesterSection } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const getQuery = (whereQuery) => `select
semester.display_name as "semester",
json_agg(jsonb_build_object('section', list.section, 'subjects', list.subjects)) as "schedule"
from semester
inner join (
select
    semester_section.semester_id as "id",
    section.name as "section",
    json_agg(jsonb_build_object('subject', subjects.name, 'teacher', teachers.name)) as "subjects"
from semester_section
inner join section on section.id = semester_section.section_id and section.is_active is true
inner join teachers on teachers.id = semester_section.teacher_id and teachers.is_active is true
inner join subjects on subjects.id = semester_section.subject_id and subjects.is_active is true
where semester_section.is_active = true and semester_section.is_deleted = false
group by 1,2
order by 2 desc
) list on list.id = semester.id and semester.is_active is true 
${whereQuery ? whereQuery : ""}
group by 1
order by 1 asc;`;

const getMappingData = `select
json_build_array(jsonb_build_object('id', semester.id, 'name', semester.display_name)) as "semester",
json_build_array(jsonb_build_object('id', section.id, 'name', section.name)) as "section",
json_build_array(jsonb_build_object('id', subjects.id, 'name', subjects.display_name)) as "subject"
from
semester_section
inner join semester on semester.id = semester_section.semester_id and semester.is_active is true
inner join section on section.id = semester_section.section_id and section.is_active is true
inner join subjects on subjects.id = semester_section.subject_id and subjects.is_active is true
where semester_section.is_active = true and semester_section.is_deleted = false and semester_section.teacher_id = $1`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await SemesterSection.findOne({ where });
};

const add = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await SemesterSection.create(data);
  });
};

const update = async (data, id) => {
  return await SemesterSection.update(data, { where: { teacherId: id } });
};

const remove = async (teacherId, subId) => {
  await SemesterSection.update(
    { isActive: false, isDeleted: true },
    { where: { teacherId: teacherId, subId: subId } }
  );
  return teacherId;
};

const getAll = async () => {
  return await db.sequelize.query(getQuery(), { type: QueryTypes.SELECT });
};

const getBySemester = async (semId) => {
  const replacements = [semId];
  const whereQuery = ` where semester.id = $1 `;
  return await db.sequelize.query(getQuery(whereQuery), {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const getDataByTeacherId = async (teacherId) => {
  const replacements = [teacherId];
  return await db.sequelize.query(getMappingData, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

module.exports = {
  findOneByField,
  add,
  update,
  remove,
  getAll,
  getBySemester,
  getDataByTeacherId,
};

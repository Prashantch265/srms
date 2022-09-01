const { ExaminationSchedule } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const getAllQuery = `select
assessments.name as "assessment",
jsonb_agg(jsonb_build_object('semester', semesters.name, 'subjects', semesters.subjects)) as "schedules"
from assessments
inner join (
select
semester.id as "id",
schedules."assessmentId",
semester.display_name as "name",
schedules.subjects as "subjects"
from
semester
inner join (
select
examination_schedule.semester_id as "semesterId",
examination_schedule.assessment_id as "assessmentId",
json_agg(jsonb_build_object('date', examination_schedule.date, 'time', examination_schedule.time, 'subject', subjects.name)) as "subjects"
from examination_schedule
inner join subjects on examination_schedule.subject_id = subjects.id and subjects.is_active is true
where examination_schedule.is_active = true and examination_schedule.is_deleted = false
group by 1, 2
order by 1
) schedules
on schedules."semesterId" = semester.id and semester.is_active is true
) semesters on semesters."assessmentId" = assessments.id and assessments.is_active is true
group by 1
order by 1`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await ExaminationSchedule.findOne({ where });
};

const add = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await ExaminationSchedule.create(data);
  });
};

const getAllExaminationSchedule = async () => {
  return await db.sequelize.query(getAllQuery, { type: QueryTypes.SELECT });
};

const getByAssessment = async (assessmentId) => {
  const whereQuery = ` and assessments.id = $1 `;
  const replacements = [assessmentId];
  return await db.sequelize.query(getAllQuery + replacements, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const remove = async (assessmentId, semesterId) => {
  return await db.sequelize.transaction(async (t) => {
    const replacements = [assessmentId, semesterId];
    const updateQuery = `update examination_schedule set is_active = false and is_deleted = true where assessment_id = $1 and semester_id = $2;`;
    return await db.sequelize.query(updateQuery, {
      bind: replacements,
      type: QueryTypes.UPDATE,
    });
  });
};

module.exports = {
  add,
  getAllExaminationSchedule,
  getByAssessment,
  remove,
  findOneByField,
};

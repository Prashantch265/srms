const { SemesterStudent } = require("../../database/models");
const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");

const getByBatchQuery = `select * from students where is_active = true and is_deleted = false and batch_id = $1`;

const getMappingByBatchQuery = `select
semester_student.semester_id, semester_student.student_id
from semester_student
inner join students on students.id = semester_student.student_id and students.is_active is true
inner join batch on batch.id = students.batch_id and batch.is_active is true and batch.passed_out is false
where semester_student.is_active = true and semester_student.is_deleted = false and batch.id = $1`;

const getStudentsQuery = `select
students.id, students.name as "name", batch.name as "batch", semester.display_name as "semester", section.display_name as "section",
students.user_name as "userName"
from semester_student
inner join semester on semester.id = semester_student.semester_id and semester.is_active is true
inner join students on students.id = semester_student.student_id and students.is_active is true
inner join batch on batch.id = semester_student.batch_id and batch.is_active is true and batch.passed_out is false
left join section on section.id = students.section_id and section.is_active is true
where semester_student.is_active = true and semester_student.is_deleted = false `;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await SemesterStudent.findOne({ where });
};

const add = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await SemesterStudent.create(data);
  });
};

const update = async (data, id) => {
  return await db.sequelize.transaction(async (t) => {
    return await SemesterStudent.update(data, { where: { id: id } });
  });
};

const getStudentList = async () => {
  const order = ` order by students.name asc `;
  return await db.sequelize.query(getStudentsQuery + order, {
    type: QueryTypes.SELECT,
  });
};

const getStudentListByBatch = async (batchId) => {
  const replacements = [batchId];
  const whereQuery = ` and semester_student.batch_id = $1 `;
  const order = ` order by students.name asc `;
  return await db.sequelize.query(getStudentsQuery + whereQuery + order, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const getStudentsByBatch = async (batchId) => {
  const replacements = [];
  replacements.push(batchId);
  return await db.sequelize.query(getByBatchQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const getExistingMappingByBatch = async (batchId) => {
  const replacements = [batchId];
  return await db.sequelize.query(getMappingByBatchQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const remove = async (batchId) => {
  await db.sequelize.transaction(async (t) => {
    return await SemesterStudent.update(
      { isActive: false, isDeleted: true },
      { where: { batchId: batchId, isActive: true } }
    );
  });
  return batchId;
};

module.exports = {
  findOneByField,
  add,
  update,
  remove,
  getStudentsByBatch,
  getExistingMappingByBatch,
  getStudentList,
  getStudentListByBatch,
};

const { QueryTypes } = require("sequelize");
const { Semester } = require("../../database/models");
const db = require("../../lib/sequelize");

const getStudentsBySemesterQuery = `select
students.id, students.name as "name", batch.name as "batch", semester.display_name as "semester", section.display_name as "section", students.user_name as "userName"
from semester_student
inner join semester on semester.id = semester_student.semester_id and semester.is_active is true
inner join students on students.id = semester_student.student_id and students.is_active is true
inner join batch on batch.id = students.batch_id and batch.is_active is true
left join section on section.id = students.section_id
where semester_student.is_active = true and semester_student.semester_id = $1
order by students.name asc`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Semester.findOne({ where });
};

const add = async (data) => {
  return await Semester.create(data);
};

const update = async (data, id) => {
  return await Semester.update(data, { where: { id: id } });
};

const fetchAll = async () => {
  return await Semester.findAll({
    where: { isActive: true, isDeleted: false },
  });
};

const fetchById = async (id) => {
  const replacements = [id];
  return await db.sequelize.query(getStudentsBySemesterQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const remove = async (id) => {
  return await Semester.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = { findOneByField, add, update, fetchAll, remove, fetchById };

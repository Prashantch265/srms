const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");
const { Student } = require("../../database/models");

const getAllQuery = `select
students.id , students.name as "name", batch.name as "batch", semester.display_name as "semester", section.name as "section", students.user_name as "userName"
from students
inner join batch on batch.id = students.batch_id and batch.is_active is true
inner join semester on semester.id = students.semester_id and semester.is_active is true
left join section on section.id = students.section_id and section.is_active is true
where students.is_active = true and students.is_deleted = false`;

const getByIdQuery = `select
students.id , students.name as "name", batch.name as "batch", semester.display_name as "semester", section.name as "section", 
students.user_name as "userName", students.email, students.contact_no as "contact", students.date_of_birth as "dob", 
students.gender , students.fathers_name as "fathersName", students.mothers_name as "mothersName", students.guardians_name as "guardiansName", 
students.fathers_contact_no as "fathersContactNo", students.mothers_contact_no as "mothersContactNo", students.guardians_contact_no as "guardiansContactNo", 
students.parents_email as "parentsEmail"
from students
inner join batch on batch.id = students.batch_id and batch.is_active is true
inner join semester on semester.id = students.semester_id and semester.is_active is true
left join section on section.id = students.section_id and section.is_active is true
where students.is_active = true and students.is_deleted = false and students.id = $1`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Student.findOne({ where });
};

const addStudentDetails = async (data) => {
  return await Student.create(data);
};

const updateStudentDetails = async (data, id) => {
  return await Student.update(data, { where: { id: id } });
};

const findAll = async () => {
  return await db.sequelize.query(getAllQuery, { type: QueryTypes.SELECT });
};

const findBySemester = async (semId) => {
  const replacements = [];
  const whereQuery = ` and students.semester_id = $1 `;
  replacements.push(semId);
  return await db.sequelize.query(getAllQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const findByBatch = async (batchId) => {
  const replacements = [];
  const whereQuery = ` and students.batch_id = $1 `;
  replacements.push(batchId);
  return await db.sequelize.query(getAllQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const findById = async (id) => {
  const replacements = [];
  replacements.push(id);
  return await db.sequelize.query(getByIdQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const deleteStudentDetails = async (id) => {
  return await Student.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = {
  findOneByField,
  addStudentDetails,
  updateStudentDetails,
  findAll,
  findBySemester,
  findByBatch,
  findById,
  deleteStudentDetails,
};

const db = require("../../lib/sequelize");
const { QueryTypes } = require("sequelize");
const { Teacher } = require("../../database/models");

const getAllQuery = `select
teachers.id, teachers.name, users.user_name as "userName", teachers.contact_no as "contactNo"
from teachers
inner join users on users.user_name = teachers.user_name and users.is_active is true
where teachers.is_active = true and teachers.is_deleted = false
order by teachers.name asc`;

const getByIdQuery = `select id, name, gender, email, contact_no as "contactNo", employment_type as "employmentType", address from teachers where teachers.is_active = true and teachers.is_deleted = false and teachers.id = $1`;

const getBySemesterQuery = `select
semester.display_name as "semester",
section.display_name as "section",
jsonb_agg(jsonb_build_object('id', teachers.id , 'name', teachers.name, 'subject', subjects.display_name, 'subjectCode', subjects.code)) as "teachers"
from teachers
inner join semester_section ss on ss.teacher_id = teachers.id and ss.is_active is true
inner join semester on  semester.id = ss.semester_id and semester.is_active is true
inner join subjects on subjects.id = ss.subject_id and subjects.is_active is true
inner join section on section.id = ss.section_id and section.is_active is true
where teachers.is_active = true and teachers.is_deleted = false
group by 1, 2
order by 1, 2`;

const findOneByField = async (where) => {
  where = { ...where, isActive: true, isDeleted: false };
  return await Teacher.findOne({ where });
};

const addTeacherDetails = async (data) => {
  return await db.sequelize.transaction(async (t) => {
    return await Teacher.create(data);
  });
};

const updateTeacherDetails = async (data, id) => {
  return await Teacher.update(data, { where: { id: id } });
};

const findAll = async () => {
  return await db.sequelize.query(getAllQuery, { type: QueryTypes.SELECT });
};

const findById = async (id) => {
  const replacements = [];
  replacements.push(id);
  return await db.sequelize.query(getByIdQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const findBySemester = async (semId) => {
  const replacements = [];
  let whereQuery = ``;
  if (semId) {
    whereQuery = ` and ss.semester_id = $1`;
    replacements.push(semId);
  }
  return await db.sequelize.query(getBySemesterQuery + whereQuery, {
    bind: replacements,
    type: QueryTypes.SELECT,
  });
};

const deleteTeacherDetails = async (id) => {
  return await Teacher.update(
    { isActive: false, isDeleted: true },
    { where: { id: id } }
  );
};

module.exports = {
  findOneByField,
  addTeacherDetails,
  updateTeacherDetails,
  findAll,
  findById,
  findBySemester,
  deleteTeacherDetails,
};

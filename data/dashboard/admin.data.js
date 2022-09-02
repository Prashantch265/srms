const { QueryTypes } = require("sequelize");
const db = require("../../lib/sequelize");

const queryToCountTotalStudents = `select
count(semester_student.student_id) as "count"
from semester_student
where semester_student.is_active = true and is_deleted = false;`;

const queryToCountTotalTeachers = `select
count(teachers.id) as "count"
from teachers
where teachers.is_deleted = false`;

const queryToCountStudentsBySemester = (whereQuery) => `select
semester.display_name,
count(students.id)
from semester_student
inner join semester on semester.id = semester_student.semester_id and semester.is_active is true
inner join students on students.id = semester_student.student_id and students.is_active is true
where  semester_student.is_active = true and semester_student.is_deleted = false ${
  whereQuery ? whereQuery : ""
}
group by 1
order by 1 `;

const queryToCountAdmin = `select
count(user_role.user_id) as "count"
from user_role
inner join users on users.user_id = user_role.user_id and users.is_active is true
inner join roles on roles.id = user_role.role_id and roles.is_active is true
where user_role.is_active = true and user_role.is_deleted = false and roles.name = 'admin'`;

const getTotalStudentCount = async () => {
  return await db.sequelize.query(queryToCountTotalStudents, {
    type: QueryTypes.SELECT,
  });
};

const getTotalTeacherCount = async () => {
  return await db.sequelize.query(queryToCountTotalTeachers, {
    type: QueryTypes.SELECT,
  });
};

const getStudentCountBySemester = async () => {
  return await db.sequelize.query(queryToCountStudentsBySemester(), {
    type: QueryTypes.SELECT,
  });
};

const getMaleStudentCountBySemester = async () => {
  const whereQuery = ` and students.gender = 'male' `;
  return await db.sequelize.query(queryToCountStudentsBySemester(whereQuery), {
    type: QueryTypes.SELECT,
  });
};

const getFemaleStudentCountBySemester = async () => {
  const whereQuery = ` and students.gender = 'female' `;
  return await db.sequelize.query(queryToCountStudentsBySemester(whereQuery), {
    type: QueryTypes.SELECT,
  });
};

const getNonBinaryStudentCountBySemester = async () => {
  const whereQuery = ` and students.gender = 'others' `;
  return await db.sequelize.query(queryToCountStudentsBySemester(whereQuery), {
    type: QueryTypes.SELECT,
  });
};

const getMaleTeacherCount = async () => {
  const whereQuery = ` and teachers.gender = 'male' `;
  return await db.sequelize.query(queryToCountTotalTeachers + whereQuery, {
    type: QueryTypes.SELECT,
  });
};

const getFemaleTeacherCount = async () => {
  const whereQuery = ` and teachers.gender = 'female' `;
  return await db.sequelize.query(queryToCountTotalTeachers + whereQuery, {
    type: QueryTypes.SELECT,
  });
};

const getNonBinaryTeacherCount = async () => {
  const whereQuery = ` and teachers.gender = 'others' `;
  return await db.sequelize.query(queryToCountTotalTeachers + whereQuery, {
    type: QueryTypes.SELECT,
  });
};

const getAdminCount = async () => {
  return await db.sequelize.query(queryToCountAdmin, {
    type: QueryTypes.SELECT,
  });
};

module.exports = {
  getTotalStudentCount,
  getTotalTeacherCount,
  getStudentCountBySemester,
  getMaleStudentCountBySemester,
  getFemaleStudentCountBySemester,
  getNonBinaryStudentCountBySemester,
  getMaleTeacherCount,
  getFemaleTeacherCount,
  getNonBinaryTeacherCount,
  getAdminCount,
};

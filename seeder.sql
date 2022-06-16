INSERT INTO roles(name, description) VALUES
('super-admin', 'This role has all the privileges needs to configure the system'),
('admin', 'This role is for administration');

SELECT * FROM roles;

INSERT INTO users(user_name, password) VALUES
('super-admin', '$2b$10$djZPNssQck2zIIPnTCh3he2c5VJ4w8deF/FuJBOeaVRMtgZ7t7kA');

SELECT * FROM users;

INSERT INTO user_role(user_id, role_id) VALUES
('', 1);

INSERT INTO privileges(name, short_name, code) VALUES
('Create', 'C', 'create'),
('Read', 'R', 'read'),
('Update', 'U', 'update'),
('Delete', 'D', 'delete'),
('Configure', 'CF', 'configure'),
('Approve', 'A', 'approve');

INSERT INTO screens(name, description) VALUES
('Master Configuration', 'This screen is used for master data setup'),
('Teacher Management', 'This screen is used to manage teachers'),
('Student Management', 'This screen is used to manage students'),
('User Management', 'This screen is used to manage users and there roles');

INSERT INTO modules(name, description, code, screen_id) VALUES
('Batch', 'This module is used to manage batch', 'batch', 1),
('Semester', 'This module is used to manage semester', 'semester', 1),
('Section', 'This module is used to manage section', 'section', 1),
('Subject', 'This module is used to manage subject', 'subject', 1),
('Assessment', 'This module is used to manage assessment', 'assessment', 1),
('Teacher', 'This module is used to manage teachers', 'teacher', 2),
('Resource Allocation', 'This module is used to allocate teachers', 'resource-allocation', 2),
('Student', 'This module is used to manage students', 'student', 3),
('Student Distribution', 'This module is used to distribute students into classes', 'student-distribution', 3),
('Users', 'This module is used to manage users', 'users', 4),
('Roles', 'This module is used to manage roles', 'roles', 4);

INSERT INTO module_privielge(module_id, privilege_id, method) VALUES
(1, 1, 'POST'),
(1, 2, 'GET'),
(1, 2, 'GET'),
(1, 3, 'PUT'),
(1, 4, 'DELETE'),
(2, 1, 'POST'),
(2, 2, 'GET'),
(2, 2, 'GET'),
(2, 3, 'PUT'),
(2, 4, 'DELETE'),
(3, 1, 'POST'),
(3, 2, 'GET'),
(3, 2, 'GET'),
(3, 3, 'PUT'),
(3, 4, 'DELETE'),
(4, 1, 'POST'),
(4, 2, 'GET'),
(4, 2, 'GET'),
(4, 3, 'PUT'),
(4, 4, 'DELETE'),
(5, 1, 'POST'),
(5, 2, 'GET'),
(5, 2, 'GET'),
(5, 3, 'PUT'),
(5, 4, 'DELETE'),
(6, 1, 'POST'),
(6, 2, 'GET'),
(6, 2, 'GET'),
(6, 3, 'PUT'),
(6, 4, 'DELETE'),
(7, 1, 'POST'),
(7, 2, 'GET'),
(7, 2, 'GET'),
(7, 3, 'PUT'),
(7, 4, 'DELETE'),
(8, 1, 'POST'),
(8, 2, 'GET'),
(8, 2, 'GET'),
(8, 3, 'PUT'),
(8, 4, 'DELETE'),
(9, 1, 'POST'),
(9, 2, 'GET'),
(9, 2, 'GET'),
(9, 3, 'PUT'),
(9, 4, 'DELETE'),
(10, 1, 'POST'),
(10, 2, 'GET'),
(10, 2, 'GET'),
(10, 3, 'PUT'),
(10, 4, 'DELETE'),
(11, 1, 'POST'),
(11, 2, 'GET'),
(11, 2, 'GET'),
(11, 3, 'PUT'),
(11, 4, 'DELETE');

INSERT INTO rsmp(module_id, privilege_id, screen_id, role_id) VALUES
(1, 1, 1, 1),
(1, 2, 1, 1),
(1, 3, 1, 1),
(1, 4, 1, 1),
(2, 1, 1, 1),
(2, 2, 1, 1),
(2, 3, 1, 1),
(2, 4, 1, 1),
(3, 1, 1, 1),
(3, 2, 1, 1),
(3, 3, 1, 1),
(3, 4, 1, 1),
(4, 1, 1, 1),
(4, 2, 1, 1),
(4, 3, 1, 1),
(4, 4, 1, 1),
(5, 1, 1, 1),
(5, 2, 1, 1),
(5, 3, 1, 1),
(5, 4, 1, 1),
(5, 5, 1, 1);


select
semester.display_name as "semester",
jsonb_agg(jsonb_build_object('id', teachers.id , 'name', teachers.name, 'subject', subjects.display_name, 'section', section.display_name)) as "teachers"
from teachers
inner join semester_section ss on ss.teacher_id = teachers.id and ss.is_active is true
inner join semester on  semester.id = ss.semester_id and semester.is_active is true
inner join subjects on subjects.id = ss.subject_id and subjects.is_active is true
inner join section on section.id = ss.section_id and section.is_active is true
where teachers.is_active = true and teachers.is_deleted = false
group by 1;

select id, name, user_name, gender, email, contact_no, employment_type, address from teachers where teachers.is_active = true and teachers.is_deleted = false and teachers.id = 1;

select  id, name, user_name, contact_no from teachers where teachers.is_active = true and teachers.is_deleted = false;
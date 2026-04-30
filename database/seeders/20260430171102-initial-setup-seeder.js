"use strict";
const bcrypt = require("bcrypt");

/**
 * ABSTRACT ALIGNMENT: Automated System Bootstrapping
 * Seeds the database with the foundational Role-Based Access Control (RBAC)
 * definitions and the initial Super Admin account required to manage the system.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Define foundational roles
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "admin",
          description: "System Administrator with full access",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "teacher",
          description: "Faculty member with grading and attendance privileges",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "student",
          description: "Enrolled student with read-only access to own records",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    // Retrieve the admin role ID dynamically to ensure proper mapping
    const roles = await queryInterface.sequelize.query(
      `SELECT id from roles WHERE name='admin';`
    );
    const adminRoleId = roles[0][0].id;

    // 2. Create the Super Admin user
    // We must manually hash the password here because bulkInsert bypasses Model hooks!
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_name: "admin", // Default login username
          password: hashedPassword,
          first_time_login: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    const users = await queryInterface.sequelize.query(
      `SELECT user_id from users WHERE user_name='admin';`
    );
    const adminUserId = users[0][0].user_id;

    // 3. Map the User to the Role
    await queryInterface.bulkInsert(
      "user_role",
      [
        {
          user_id: adminUserId,
          role_id: adminRoleId,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Cascade deletions in reverse order of creation
    await queryInterface.bulkDelete("user_role", null, {});
    await queryInterface.bulkDelete("users", { user_name: "admin" }, {});
    await queryInterface.bulkDelete("roles", null, {});
  },
};

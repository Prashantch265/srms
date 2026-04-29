const db = require("../../lib/sequelize");
const crypto = require("crypto");
const { logger } = require("../../utils/logger");

/**
 * ABSTRACT ALIGNMENT: Secure Account Provisioning
 * Generates a high-entropy plaintext temporary password.
 * Passes it to the model (where adaptive hashing occurs) and returns the plaintext
 * exclusively for the one-time email dispatch.
 */
const createUser = async (userData, transaction = null) => {
  try {
    // Generate an 8-byte (16 character hex) cryptographically secure random password
    const tempPassword = crypto.randomBytes(8).toString("hex");

    const newUser = await db.User.create(
      {
        userName: userData.userName,
        password: tempPassword, // Hashing is securely deferred to Model's beforeCreate hook
        firstTimeLogin: true,
        profilePic: userData.profilePic || null,
      },
      { transaction }
    );

    // If roles are provided, map them in the UserRole junction table
    if (userData.roles && Array.isArray(userData.roles)) {
      await newUser.setRoles(userData.roles, { transaction });
    }

    // Return the created user entity AND the plaintext password required for email dispatch
    return { user: newUser, tempPassword };
  } catch (error) {
    logger.error("Error provisioning user in userService:", error);
    throw error;
  }
};

/**
 * ABSTRACT ALIGNMENT: Identity & Access Management (IAM)
 * Standalone API service to assign or update a user's roles dynamically.
 */
const assignUserRoles = async (userId, roleIds) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Overwrites existing roles with the newly provided array of role IDs
  await user.setRoles(roleIds);
  return user;
};

const findUserByUsername = async (userName) => {
  return await db.User.findOne({
    where: { userName },
    include: [{ model: db.Role }],
  });
};

const findUserById = async (userId) => {
  return await db.User.findByPk(userId, {
    include: [{ model: db.Role }],
  });
};

const getAllUsers = async () => {
  return await db.User.findAll({
    include: [{ model: db.Role }],
    attributes: { exclude: ["password"] }, // Prevent fetching password hashes for listings
  });
};

const updateUserPassword = async (userId, newPassword) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("User not found");

  // Assigning plaintext triggers the beforeUpdate hook to re-hash adaptively
  user.password = newPassword;
  user.firstTimeLogin = false;
  return await user.save();
};

const deleteUser = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new Error("User not found");
  return await user.destroy();
};

module.exports = {
  createUser,
  assignUserRoles,
  findUserByUsername,
  findUserById,
  getAllUsers,
  updateUserPassword,
  deleteUser,
};

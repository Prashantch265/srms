const UserData = require("../../data/rsmp/users.data");
const bcrypt = require("bcrypt");
const { errorResponse, successResponse } = require("../../utils");

const registerNewUser = async (data) => {
  const { userName, password } = data;
  const existingUser = await UserData.findOneByField({ userName: userName });
  if (existingUser) return errorResponse(400, "duplicateData", "user");
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(password, salt);
  const res = await UserData.register(data);
  return successResponse(200, res, "create", "user");
};

const updateUser = async (data, userId) => {
  const existingUser = UserData.findOneByField({ userId: userId });
  if (!existingUser) return errorResponse(400, "notFound", "user");
  const updatedUser = { ...data, ...existingUser };
  const res = await UserData.update(updatedUser);
  return successResponse(200, res, "update", "user");
};

const getAllUsers = async () => {
  const res = await UserData.fetchAll();
  return successResponse(200, res, "fetch", "user");
};

const getUserById = async (userId) => {
  const res = await UserData.findOneByField({ userId: userId });
  return successResponse(200, res, "fetch", "user");
};

const deleteUser = async (userId) => {
  const res = await UserData.remove(userId);
  return successResponse(200, res, "delete", "user");
};

module.exports = {
  registerNewUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};

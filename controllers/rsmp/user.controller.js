const UserService = require("../../services/rsmp/users.service");
const { successResponse } = require("../../utils");
const httpContext = require("express-http-context");

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await UserService.registerNewUser(data);
    return successResponse(res, resData, "create", "User");
  } catch (error) {
    next(error);
  }
};

const fetchAllUser = async (req, res, next) => {
  const resData = await UserService.getAllUsers();
  return successResponse(res, resData, "fetch", "User");
};

const updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const resData = await UserService.updateUser(data, userId);
    return successResponse(res, resData, "update", "User");
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let data;
    const { userId } = httpContext.get("user");
    const { password } = req.body;
    data.password = password;
    // data.profilePic = req.file.filename;
    const resData = await UserService.updateUser(data, userId);
    return successResponse(res, resData, "update", "profile");
  } catch (error) {
    next(error);
  }
};

const addProfilePicture = async (req, res, next) => {
  try {
    const { userId } = httpContext.get("user");
    const file = req.file.filename;
    const resData = await UserService.updateUser(file, userId);
    return successResponse(res, resData, "update", "User");
  } catch (error) {
    next(error);
  }
};

const fetchUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const resData = await UserService.getUserById(userId);
    return successResponse(res, resData, "fetch", "User");
  } catch (error) {
    next(error);
  }
};

const fetchByRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const resData = await UserService.getUserByRole(roleId);
    return successResponse(res, resData, "fetch", "User");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const resData = await UserService.deleteUser(userId);
    return successResponse(res, resData, "delete", "User");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
  updateUser,
  fetchAllUser,
  fetchUserById,
  deleteUser,
  fetchByRole,
  addProfilePicture,
  updateProfile,
};

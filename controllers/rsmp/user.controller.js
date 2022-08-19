const UserService = require("../../services/rsmp/users.service");
const { successResponse } = require("../../utils");

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

const fetchUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const resData = await UserService.getUserById(userId);
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
};

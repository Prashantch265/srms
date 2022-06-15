const UserService = require("../../services/rsmp/users.service");

const registerUser = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await UserService.create(data);
    return res.json(resData);
  } catch (error) {
    next(error);
  }
};

const fetchAllUser = async (req, res, next) => {
  try {
    const { role } = req.query;
    if (role) {
      const resData = await UserService.getByRole(role);
      return res.json(resData);
    }
    const resData = await UserService.getAllUsers();
    return res.json(resData);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const resData = await UserService.update(data, userId);
    return res.json(resData);
  } catch (error) {
    next(error);
  }
};

const fetchUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const resData = await UserService.getById(userId);
    return res.json(resData);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const resData = await UserService.remove(userId);
    return res.json(resData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  fetchAllUser,
  fetchUserById,
  updateUser,
  deleteUser,
};

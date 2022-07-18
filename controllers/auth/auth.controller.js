const { successResponse } = require("../../utils");
const AuthService = require("../../services/auth/auth.services");

const authenticate = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const resData = await AuthService.authenticate(userName, password);
    return successResponse(res, resData, "loggedIn");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, forgotPassword };

const UserData = require("../../data/rsmp/users.data");
const RoleData = require("../../data/rsmp/role.data");
const { errorResponse } = require("../../utils");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../../lib/jwt");

const authenticate = async (userName, password) => {
  const user = await UserData.findOneByField({ userName: userName });
  if (!user) return errorResponse(401, "invalidCredential");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return errorResponse(401, "invalidCredential");

  const accessToken = await signAccessToken(user);

  const { name } = await RoleData.findOneByField({ id: user.roleId });
  return { accessToken: accessToken, role: name };
};

module.exports = { authenticate };

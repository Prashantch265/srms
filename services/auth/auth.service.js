const RoleData = require("../../data/rbac/role.data");
const UserRoleData = require("../../data/rbac/user-role.data");
const HttpException = require("../../utils/httpException");
const { signAccessToken } = require("../../lib/jwt");
const db = require("../../lib/sequelize"); // Imported for OOP model access

const authenticate = async (userName, password) => {
  // ABSTRACT ALIGNMENT: Security & OOP Encapsulation
  // Bypassing raw data layer to retrieve the rich Sequelize Model instance.
  // This allows us to use the encapsulated cryptographic methods defined in the Model.
  const user = await db.User.findOne({ where: { userName: userName } });
  if (!user) throw new HttpException(400, "invalidCredential");

  // Calling the encapsulated instance method to verify password in constant time
  const isMatch = await user.validPassword(password);
  if (!isMatch) throw new HttpException(400, "invalidCredential");

  const accessToken = await signAccessToken(user);

  const { roleId } = await UserRoleData.findOneByField({
    userId: user.userId,
  });

  const { name } = await RoleData.findOneByField({ id: roleId });
  return { accessToken: accessToken, role: name };
};

const init = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) throw new HttpException(400, "notFound", "user");
  return user;
};

module.exports = { authenticate, init };

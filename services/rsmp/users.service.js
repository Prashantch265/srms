const UserData = require("../../data/rsmp/users.data");
const UserRoleService = require("../../services/rsmp/user-role.service");
const RoleData = require("../../data/rsmp/role.data");
const bcrypt = require("bcrypt");
const HttpException = require("../../utils/httpException");

const registerNewUser = async (data) => {
  let { userName, password, roleId } = data;
  const existingUser = await UserData.findOneByField({ userName: userName });
  if (existingUser) throw new HttpException(400, "duplicateData", "user");
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(password, salt);
  const res = await UserData.register(data);
  const role = await RoleData.findOneByField({ name: "admin" });
  await UserRoleService.add({
    userId: res.userId,
    roleId: roleId ? roleId : role.id,
  });
  return res;
};

const updateUser = async (data, userId) => {
  let { password } = data;
  const existingUser = UserData.findOneByField({ userId: userId });
  if (!existingUser) throw new HttpException(400, "notFound", "user");
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    if (existingUser.firstTimeLogin) data.firstTimeLogin = false;
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(password, salt);
    const updatedUser = { ...data, ...existingUser };
    const res = await UserData.update(updatedUser);
    return res;
  }
  return;
};

const getAllUsers = async () => {
  const res = await UserData.fetchAll();
  return res;
};

const getUserById = async (userId) => {
  const res = await UserData.fetchById(userId);
  return res;
};

const deleteUser = async (userId) => {
  const res = await UserData.remove(userId);
  return res;
};

module.exports = {
  registerNewUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};

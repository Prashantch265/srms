const UserData = require("../../data/rsmp/users.data");
const bcrypt = require("bcrypt");
const { errorResponse } = require('../../utils');
const { successResponse } = require('../../utils');

const registerNewUser = async (data) => {
    const { userName, password } = data;
    const existingUser = await UserData.findOneByField({ userName: userName });
    if (existingUser) return errorResponse(400, 'duplicateData', 'user');
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(password, salt);
    const res = await UserData.register(data);
    return res;
}

const updateUser = async (data, userId) => {
    const existingUser = UserData.findOneByField({ userId: userId });
    const updatedUser = { ...data, ...existingUser };
    const res = await UserData.update(updatedUser);
    return res;
}

const getAllUsers = async () => {
    const res = await UserData.fetchAll();
    return res;
}

const getUserById = async (userId) => {
    const res = await UserData.findOneByField({ userId: userId });
    return res;
}

const deleteUser = async (userId) => {
    const res = await UserData.remove(userId);
    return res;
}

module.exports = { registerNewUser, updateUser, getAllUsers, getUserById, deleteUser };

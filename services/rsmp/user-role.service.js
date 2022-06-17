const UserRoleData = require("../../data/mappings/");
const UserData = require("../../data/rsmp/users.data");
const RoleData = require("../../data/rsmp/role.data");
const { errorResponse } = require("../../utils");

const validateForeignKey = async(userId, roleId) => {
    const user = await UserData.findOneByField({userId: userId});
    if(!user) return errorResponse(400, "notFound", "user");

    const role = await RoleData.findOneByField({id: roleId});
    if(!role) return errorResponse(400, "notFound", "role");

    return;
};

const add = async (data) => {
    const {userId, roleId} = data;
    await validateForeignKey(userId, roleId);
    const res = await 
};

const update = async (data, id) => {};

const remove = async (id) => {};

module.exports = { add, update, remove };

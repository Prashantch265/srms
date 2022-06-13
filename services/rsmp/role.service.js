const RoleData = require("../../data/rsmp/role.data");
const { errorResponse, successResponse } = require("../../utils");

const add = async (data) => {
  const existingRole = await RoleData.findOneByField({ name: data.name });
  if (existingRole) return errorResponse(400, "duplicateData", "role");
  const res = await RoleData.add(data);
  return successResponse(200, res, "create", "role");
};

const update = async (data, id) => {
  const existingRole = await RoleData.findOneByField({ id: id });
  if (!existingRole) return errorResponse(400, "notFound", "role");
  const updatedRole = { ...data, ...existingRole };
  const res = await RoleData.update(updatedRole, id);
  return successResponse(200, res, "update", "role");
};

const getAll = async () => {
  const res = await RoleData.fetchAll();
  return successResponse(200, res, "fetch", "role");
};

const getById = async (id) => {
  const res = await RoleData.findOneByField({ id: id });
  if (!res) return errorResponse(400, "notFound", "fetch", "role");
  return successResponse(200, res, "fetch", "role");
};

const remove = async (id) => {
  const res = await RoleData.remove(id);
  return successResponse(200, res, "delete", "role");
};

module.exports = { add, update, getAll, getById, remove };

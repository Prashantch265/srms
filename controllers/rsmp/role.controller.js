const RoleService = require("../../services/rsmp/role.service");
const { successResponse } = require("../../utils");

const addRole = async (req, res, next) => {
  try {
    const data = req.body;
    const resData = await RoleService.add(data);
    return successResponse(res, resData, "create", "role");
  } catch (error) {
    next(error);
  }
};

const fetchAllRole = async (req, res, next) => {
  const resData = await RoleService.getAll();
  return successResponse(res, resData, "fetch", "role");
};

const updateRole = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const resData = await RoleService.update(data, id);
    return successResponse(res, resData, "update", "role");
  } catch (error) {
    next(error);
  }
};

const fetchRoleById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await RoleService.getById(id);
    return successResponse(res, resData, "fetch", "role");
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resData = await RoleService.remove(id);
    return res.json(resData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRole,
  updateRole,
  fetchAllRole,
  fetchRoleById,
  deleteRole,
};

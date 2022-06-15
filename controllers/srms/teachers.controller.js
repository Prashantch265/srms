const TeacherService = require("../../services/srms/teachers.service");
const { successResponse } = require("../../utils");

const add = async(req, res, next)=> {
    try {
        const data = req.body;
        const resData = await TeacherService
    } catch (error) {
        next(error);
    }
}
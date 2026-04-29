const httpContext = require("express-http-context");
const db = require("../lib/sequelize");
const { errorResponse } = require("../utils");

/**
 * ABSTRACT ALIGNMENT: Role-Based Access Control & Row-Level Security
 * Enforces strict data ownership. Ensures that heavily restricted roles
 * (like parents and students) can only access their legally associated database rows.
 */
const authorizeStudentData = async (req, res, next) => {
  try {
    const currentUser = httpContext.get("user");
    const requestedStudentId = req.params.studentId;

    if (!currentUser) {
      return res
        .status(401)
        .json(errorResponse(401, "Authentication required."));
    }

    // Admins and Teachers bypass row-level security for student records
    if (["admin", "teacher"].includes(currentUser.role)) {
      return next();
    }

    // For Students and Parents, enforce Row-Level Security (RLS)
    // We look up the student profile linked to the currently authenticated credential
    const linkedStudent = await db.Student.findOne({
      where: { user_name: currentUser.userName },
    });

    // If no mapping exists, or the requested ID doesn't match the owned ID, reject with 403
    if (
      !linkedStudent ||
      linkedStudent.id.toString() !== requestedStudentId.toString()
    ) {
      return res
        .status(403)
        .json(
          errorResponse(
            403,
            "Access Denied: You are not authorized to view this student's records."
          )
        );
    }

    // Ownership verified, pass execution to the controller
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authorizeStudentData,
};

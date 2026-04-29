const httpContext = require("express-http-context");
const passport = require("passport");
const { unprotectedRoutes } = require("../config/protect");
const { match } = require("node-match-path");
const db = require("../lib/sequelize");
const { logger } = require("../utils/logger");

const authMiddleware = (req, res, next) => {
  try {
    let isMatch = false;
    unprotectedRoutes.forEach((route) => {
      const { matches } = match(route, req.path);
      if (matches) {
        isMatch = true;
      }
    });

    if (isMatch) {
      return next();
    }

    passport.authenticate("jwt", { session: false })(req, res, async () => {
      // Catch empty/invalid passport authentications gracefully
      if (!req.user || !req.user[0]) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized. Invalid or expired token.",
        });
      }

      let userObj = req.user[0];

      // ABSTRACT ALIGNMENT: RBAC Foundation Context
      // If the JWT payload didn't explicitly pack the role, we dynamically fetch it
      // to guarantee the RBAC Row-Level Security middleware has the exact security context.
      if (!userObj.role) {
        try {
          const userWithRoles = await db.User.findOne({
            where: { user_name: userObj.userName || userObj.user_name },
            include: [{ model: db.Role }],
          });

          if (
            userWithRoles &&
            userWithRoles.roles &&
            userWithRoles.roles.length > 0
          ) {
            userObj.role = userWithRoles.roles[0].name;
          } else {
            // Principle of Least Privilege: Default to 'student' if no role is mapped
            userObj.role = "student";
          }
        } catch (error) {
          logger.error(
            "Failed to fetch RBAC role context in auth middleware",
            error
          );
          return res
            .status(500)
            .json({ status: 500, message: "Security context failure." });
        }
      }

      const userInfo = {
        userId: userObj.userId || userObj.user_id,
        userName: userObj.userName || userObj.user_name,
        name: userObj.name,
        role: userObj.role,
      };

      // Inject the fully verified security context into the request lifecycle
      httpContext.set("user", userInfo);
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddleware };

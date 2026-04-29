const { postgres } = require("../config/config");
const glob = require("glob");
const { Sequelize } = require("sequelize");
const { logger } = require("../utils/logger");
const { isIterable } = require("../utils");
const cls = require("cls-hooked");
const httpContext = require("express-http-context");

const namespace = cls.createNamespace("transactional");
Sequelize.useCLS(namespace);

// Helper function to dynamically extract the user context
const getContextUserId = (options) => {
  // 1. Check if the developer manually passed it (highest priority)
  if (options && options.userId) return options.userId;

  // 2. Automatically retrieve from the async execution context
  const userContext = httpContext.get("user");
  if (userContext && userContext.userId) return userContext.userId;

  return null; // System-level execution (e.g., cron jobs, seeders)
};

const sequelize = new Sequelize(
  postgres.database,
  postgres.user,
  postgres.password,
  {
    dialect: postgres.dialect,
    host: postgres.host,
    pool: {
      max: 5,
      idle: 30000,
    },
    define: {
      underscored: true,
      hooks: {
        beforeCreate(instance, options) {
          const currentUserId = getContextUserId(options);
          if (currentUserId) {
            instance.createdBy = instance.createdBy || currentUserId;
            instance.updatedBy = instance.updatedBy || currentUserId;
          }
        },
        beforeBulkCreate(instances, options) {
          const currentUserId = getContextUserId(options);
          if (isIterable(instances) && currentUserId) {
            instances.forEach((instance) => {
              instance.createdBy = instance.createdBy || currentUserId;
              instance.updatedBy = instance.updatedBy || currentUserId;
            });
          }
        },
        beforeUpdate(instance, options) {
          const currentUserId = getContextUserId(options);
          if (currentUserId) {
            instance.updatedBy = currentUserId;
          }
        },
        beforeBulkUpdate(instances, options) {
          const currentUserId = getContextUserId(options);
          if (isIterable(instances) && currentUserId) {
            instances.forEach((instance) => {
              instance.updatedBy = currentUserId;
            });
          }
        },
      },
    },
  }
);

const models = glob.sync(__dirname + `/../database/models/**/*.model.js`);

const db = {};

models.forEach((modelFile) => {
  if (process.env.NODE_ENV === "development")
    logger.info("Model :: " + modelFile);

  const model = require(modelFile)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((key) => {
  if ("associate" in db[key]) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

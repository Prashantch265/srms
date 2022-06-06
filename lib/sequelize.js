const { postgres, mysql } = require("../config/config");
const glob = require("glob");
const { Sequelize, DataTypes } = require("sequelize");
const { logger } = require("../utils/logger");
const { isIterable } = require("../utils");

const sequelize = new Sequelize(postgres.database, postgres.user, postgres.password, {
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
        if (options.userId) {
          instance.createdBy = instance.createdBy || options.userId;
          instance.updatedBy = instance.updatedBy || options.userId;
        }
      },
      beforeBulkCreate(instances, options) {
        if (isIterable(instances)) {
          instances.forEach((instance) => {
            if (options.userId || instance.createdBy) {
              instance.createdBy = instance.createdBy || options.userId;
              instance.updatedBy = instance.updatedBy || options.userId;
            }
          });
        }
      },
      beforeUpdate(instance, options) {
        if (options.userId) {
          instance.updatedBy = options.userId;
        }
      },
      beforeBulkUpdate(instances, options) {
        if (isIterable(instances)) {
          instances.forEach((instance) => {
            if (instance.createdBy && options.userId) {
              instance.updatedBy = options.userId;
            }
          });
        }
      },
    },
  },
});

const models = glob.sync(__dirname + `/../database/models/**/*.model.js`);

const db = {};

models.forEach((modelFile) => {
  if (process.env.NODE_ENV === "development") logger.info("Model :: " + modelFile);

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
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "user_name",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
      },
      profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "profile_pic",
      },
      firstTimeLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "first_time_login",
      },
    },
    {
      tableName: "users",
      hooks: {
        // ABSTRACT ALIGNMENT: Cryptographic Security
        // Implements adaptive salt-based hashing prior to persistence to thwart rainbow-table attacks.
        beforeCreate: async (user) => {
          if (user.password) {
            // High computation cost factor of 12 for adaptive security
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  // Instance method for secure comparison during authentication
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = function (models) {
    User.belongsToMany(models.roles, {
      through: models.user_role,
      foreignKey: "user_id",
      otherKey: "role_id",
    });

    User.hasOne(models.teachers, {
      foreignKey: "user_name",
      sourceKey: "userName", // References the camelCase JS attribute
      onDelete: "CASCADE",
    });

    User.hasOne(models.students, {
      foreignKey: "user_name",
      sourceKey: "userName", // References the camelCase JS attribute
      onDelete: "CASCADE",
    });
  };

  return User;
};

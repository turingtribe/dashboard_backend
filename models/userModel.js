// Example database model for users
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");

const User = database_config.define(
  "Users",
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Indicates this is the primary key
      autoIncrement: true, // Automatically generates and increments the value
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false, // This field is not nullable
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ReferralCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // This will remove createdAt and updatedAt columns
  }
);
module.exports = {
  User,
};

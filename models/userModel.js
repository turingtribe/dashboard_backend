// Example database model for users
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");
// const {UserDetail}=require("./userDetailsModel");
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
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    ReferralCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false, // This will remove createdAt and updatedAt columns
  }
);
// User.hasOne(UserDetail, { foreignKey: 'UserDetailsId' });
// User.hasMany(Registration, { foreignKey: 'userId' });
User.sync()
  .then(() => {
    console.log("user table created");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });
module.exports = {
  User,
};

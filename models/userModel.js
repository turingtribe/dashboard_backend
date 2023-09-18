// Example database model for users
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");

const User = database_config.define(
  "User",
  {
    userId: {
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
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ReferralCode: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: true, // This field is not nullable
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true, // Ensure that the value is a valid date
      },
    },
    work: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    graduation: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true, // Ensure that the value is a valid date
      },
    },
    adharCard: {
      type: DataTypes.BOOLEAN,
      allowNull: true, // You can set allowNull to true if the value can be null
      defaultValue: false, // You can set a default value if needed
    },
  },
  {
    timestamps: false, // This will remove createdAt and updatedAt columns
  }
);

// Sync the model with the database
User.sync()
  .then(() => {
    console.log("User table created");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });
module.exports = {
  User,
};

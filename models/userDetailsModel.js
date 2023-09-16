// Example database model for users
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");

const UserDetail = database_config.define(
  "UsersDetails",
  {
    UserDetailsId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Indicates this is the primary key
    },
    profileImage: {
      type: DataTypes.STRING(255),
      allowNull: false, // This field is not nullable
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Ensure that the value is a valid date
      },
    },
    graduation: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Ensure that the value is a valid date
      },
    },
    work: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // You can set allowNull to true if the value can be null
      defaultValue: true, // You can set a default value if needed
    },
    adharCard: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // You can set allowNull to true if the value can be null
      defaultValue: true, // You can set a default value if needed
    },
  },
  {
    timestamps: false, // This will remove createdAt and updatedAt columns
  }
);
// Sync the model with the database
UserDetail.sync()
  .then(() => {
    console.log("UserDetails table created");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });
module.exports = {
  UserDetail,
};

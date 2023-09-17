// Define Msat model
const { database_config } = require("../config/database");
const { User } = require("./userModel");
const { DataTypes } = require("sequelize");
const Msat = database_config.define("Msat", {
  msatId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  attempt: {
    type: DataTypes.INTEGER(50),
    validate: {
      max: 2, // Maximum value allowed is 2
    },
  },
  user_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
});
Msat.belongsTo(User, {
  foreignKey: "user_Id", // This defines the foreign key relationship
});
Msat.sync()
  .then(() => {
    console.log("Msat table created");
  })
  .catch((error) => {
    console.error("Error creating Msat table:", error);
  });
module.exports = {
  Msat,
};

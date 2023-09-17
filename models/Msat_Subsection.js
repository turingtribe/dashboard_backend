const { Msat } = require("./msatModel");
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");
// Define the MsatSubSection model
const MsatSubSection = database_config.define("MsatSubSection", {
  sub_sectionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sub_section_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  msat_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Msat,
      key: "msatId",
    },
  },
  score: {
    type: DataTypes.INTEGER,
  },
});
MsatSubSection.belongsTo(Msat, {
  foreignKey: "msat_Id", // This defines the foreign key relationship
});

MsatSubSection.sync()
  .then(() => {
    console.log("MsatSubSection table created");
  })
  .catch((error) => {
    console.error("Error creating MsatSubSection table:", error);
  });

module.exports = {
  MsatSubSection,
};

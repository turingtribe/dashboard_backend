const { DataTypes } = require("sequelize");
const { database_config } = require("../config/database"); // Replace with your Sequelize instance

const Activity = database_config.define("Activities", {
  activicesId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.BOOLEAN,
  },
  photoUrl: {
    type: DataTypes.STRING(100),
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  register: {
    type: DataTypes.BOOLEAN,
  },
  vedioUrl: {
    type: DataTypes.STRING,
  },
  zoomlink: {
    type: DataTypes.STRING,
  },
});

Activity.sync()
  .then(() => {
    console.log("Activity table created");
  })
  .catch((error) => {
    console.error("Error creating Activity table:", error);
  });
// Define associations
// Activity.belongsTo(UserDetails, { foreignKey: "userDetailsId" });

module.exports = Activity;

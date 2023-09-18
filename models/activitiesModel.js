const { DataTypes } = require("sequelize");
const { database_config } = require("../config/database"); // Replace with your Sequelize instance
const { User } = require("./userModel");

const Activity = database_config.define("Activities", {
  activicesId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
  },
  aboutEvent: {
    type: DataTypes.STRING(255),
  },
  aboutSpeaker: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.BOOLEAN,
  },
  instructor_name: {
    type: DataTypes.STRING(25),
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
    defaultValue: false,
  },
  vedioUrl: {
    type: DataTypes.STRING(255),
  },
  zoomlink: {
    type: DataTypes.STRING(255),
  },
  peopleRegistered: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
});
// database_config.sync({ force: true });
Activity.sync()
  .then(() => {
    console.log("Activity table created");
  })
  .catch((error) => {
    console.error("Error creating Activity table:", error);
  });

module.exports = Activity;

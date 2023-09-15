const { DataTypes } = require("sequelize");
const { database_config } = require("../config/database"); // Replace with your Sequelize instance

const Course = database_config.define("Course", {
  courseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  duration: {
    type: DataTypes.DATE,
  },
  imageUrl: {
    type: DataTypes.STRING(255),
  },
  description: {
    type: DataTypes.STRING(255),
  },
});

Course.sync()
  .then(() => {
    console.log("course table created");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });
// Define associations
// Course.belongsTo(Student, { foreignKey: 'courseId' });

module.exports = { Course };

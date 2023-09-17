const { DataTypes } = require("sequelize");
const { database_config } = require("../config/database"); // Replace with
// your Sequelize instance
const { User } = require("./userModel");

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
  courseTypes: {
    type: DataTypes.ENUM("UX", "WD", "DA", "AD"),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
  },
  batch: {
    type: DataTypes.BOOLEAN,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
});
// Course.belongsTo(User, {
//   foreignKey: "user_Id", // This defines the foreign key relationship
// });
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

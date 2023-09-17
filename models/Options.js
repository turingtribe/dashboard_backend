const { Question } = require("./question");
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");
// Define the Options model
const Options = database_config.define("Options", {
  option_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  option_text: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Question,
      key: "questionId",
    },
  },
  is_correct: {
    type: DataTypes.BOOLEAN,
  },
});

Options.belongsTo(Question, {
  foreignKey: "question_id", // This defines the foreign key relationship
});

Options.sync()
  .then(() => {
    console.log("Option table created");
  })
  .catch((error) => {
    console.error("Error creating option table:", error);
  });

module.exports = {
  Options,
};

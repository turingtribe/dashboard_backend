const { MsatSubSection } = require("./Msat_Subsection");
const { database_config } = require("../config/database");
const { DataTypes } = require("sequelize");
// Define the Question model
const Question = database_config.define("Question", {
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question_text: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  subsection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MsatSubSection,
      key: "sub_sectionId",
    },
  },
});

Question.belongsTo(MsatSubSection, {
  foreignKey: "subsection_id", // This defines the foreign key relationship
});

Question.sync()
  .then(() => {
    console.log("question table created");
  })
  .catch((error) => {
    console.error("Error creating question table:", error);
  });

module.exports = {
  Question,
};

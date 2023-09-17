// Database configuration
require("dotenv").config();
const { Sequelize } = require("sequelize");
const database_config = new Sequelize({
  dialect: "mysql", // Change this to your database dialect
  database: "testing",
  username: "root",
  password: "root",
  host: "localhost", // Change this to your database host
});

module.exports = {
  database_config,
};

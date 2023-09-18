// Database configuration
require("dotenv").config();
const { Sequelize } = require("sequelize");
const database_config = new Sequelize({
  dialect: "mysql", // Change this to your database dialect
  database: "Dashboard_backend",
  username: "root",
  password: "6809",
  host: "localhost", // Change this to your database host
});

module.exports = {
  database_config,
};

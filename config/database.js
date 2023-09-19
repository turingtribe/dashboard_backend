// Database configuration
require("dotenv").config();
const { Sequelize } = require("sequelize");
const database_config = new Sequelize({
  dialect: process.env.DIALECT, // Change this to your database dialect
  username: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST, // Change this to your database host
});

module.exports = {
  database_config,
};

const express = require("express");
const ActivityRoute = express.Router();
const { activity } = require("../controllers/ActivityControllers");

ActivityRoute.post("/activity", activity);
module.exports = {
  ActivityRoute,
};

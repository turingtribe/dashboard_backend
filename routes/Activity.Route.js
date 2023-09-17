const express = require("express");
const ActivityController = require("../controllers/ActivityControllers");

const activityRoute = express.Router();
const activityController = new ActivityController();
activityRoute.post("/activities", activityController.createActivity);
activityRoute.get("/activities", activityController.getAllActivities);
activityRoute.get(
  "/activities/:activityId",
  activityController.getActivityById
);
activityRoute.delete(
  "/activities/:activityId",
  activityController.deleteActivity
);
module.exports = { activityRoute };

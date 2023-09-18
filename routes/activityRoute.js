const express = require("express");
const { AuthMiddleware } = require("../middleware/authentication");
const ActivityController = require("../controllers/activityControllers");
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
activityRoute.get(
  "/register-activity",
  AuthMiddleware,
  activityController.registerActivity
);

module.exports = { activityRoute };

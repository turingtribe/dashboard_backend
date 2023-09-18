const express = require("express");
const {ActivityController} = require("../controllers/activityControllers");
const {AuthMiddleware}=require("../middleware/authentication")
const activityRoute = express.Router();
const activityController = new ActivityController();
activityRoute.post("/activities",AuthMiddleware, activityController.createActivity);
activityRoute.get("/activities", activityController.getAllActivities);
activityRoute.get(
  "/activities/:activityId",
  activityController.getActivityById
);
activityRoute.get(
  "/type",
  activityController.getActivityByType
);
activityRoute.delete(
  "/activities/:activityId",
  activityController.deleteActivity
);
module.exports = { activityRoute };

const Activity = require("../models/ActivitiesModel");
class ActivityController {
  async createActivity(req, res) {
    try {
      const newActivity = await Activity.create(req.body);
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllActivities(req, res) {
    try {
      const activities = await Activity.findAll();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteActivity(req, res) {
    try {
      const activityId = req.params.activityId;
      const activity = await Activity.findByPk(activityId);

      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }

      await activity.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getActivityById(req, res) {
    try {
      const activityId = req.params.activityId;
      const activity = await Activity.findByPk(activityId);

      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }

      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = ActivityController;

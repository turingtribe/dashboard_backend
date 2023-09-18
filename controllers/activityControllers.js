const Activity = require("../models/activitiesModel");
const { User } = require("../models/userModel");
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
    if (req.query.type) {
      try {
        const activityId = req.query.type;

        const activities = await Activity.findAll({
          where: {
            type: activityId,
          },
        });
        for (let activity of activities) {
          if (activity.type == true) {
            activity.type = "Masterclass";
          } else {
            activity.type = "Webinar";
          }
        }
        res.send(activities);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const activities = await Activity.findAll();
        for (let activity of activities) {
          if (activity.type == true) {
            activity.type = "Masterclass";
          } else {
            activity.type = "Webinar";
          }
        }
        res.status(200).json(activities);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
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
      if (activity.type == true) {
        activity.type = "Masterclass";
      }
      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async registerActivity(req, res) {
    const finduser = req.body.userId;
    try {
      const user = await User.findByPk(finduser);
      if (req?.query?.activityId && user) {
        const activityId = req.query.activityId;
        const activity = await Activity.findByPk(activityId);
        activity.user_id = finduser;
        activity.register = true;
        await activity.save();
        res.status(200).send(activity);
      } else {
        res.status(401).send({ message: "Incorrect activityId" });
      }
    } catch (err) {
      res.status(401).send(err);
    }
  }
}

module.exports = ActivityController;

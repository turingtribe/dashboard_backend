const Activity = require("../models/activitiesModel");

class ActivityController {
  async createActivity(req, res) {
  
    const user_id=req.body.userId;
    
    const {type,instructor_name,photoUrl,startDate,endDate,register,vedioUrl,zoomlink} = req.body;
    try {
      const newActivity = await Activity.create({type,instructor_name,photoUrl,startDate,endDate,register,vedioUrl,zoomlink,user_id});
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllActivities(req, res) {
    if(req.query.type){
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
    }
    else{
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

  async getActivityByType(req, res) {
    console.log("hlooo")
    try {
      const activityId = req.query.type;
      console.log(activityId,"holllll")
      const activities = await Activity.findAll({
        where: {
          instructor_name: Aditya,
        },
      });

      res.send(activities);
      // if (!activity) {
      //   return res.status(404).json({ error: "Activity not found" });
      // }
      // if (activity.type == true) {
      //   activity.type = "Masterclass";
      // }
      // res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {ActivityController};

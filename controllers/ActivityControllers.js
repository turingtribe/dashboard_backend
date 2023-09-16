const Activity= require("../models/ActivitiesModel");
const activity = async (req, res) => {
    console.log(req.body,"hlooo")
  try {
    await Activity.create(req.body);
    res.send("user activities registred");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { activity };
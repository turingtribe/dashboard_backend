const { Course } = require("../models/CourseModel");
const course = async (req, res) => {
  try {
    await Course.create(req.body);
    res.send("Student allocated course successfully");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { course };

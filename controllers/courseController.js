const { Course } = require("../models/courseModel");
const { User } = require("../models/userModel");
class CourseController {
  constructor() {}
  async createCourse(req, res) {
    const course = await Course.create(req.body);
    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  }
  async getCourses(req, res) {
    return res.ststus(200).send(await Course.findAll());
  }
  async userCourse(req, res) {
    const userId = req.body.userId;
    try {
      const user = await User.findByPk(userId);
      if (req?.query?.courseId) {
        const courseId = req.query.courseId;
        const course = await Course.findByPk(courseId);
        console.log(course.user_id);
        if (course.user_id == null) {
          course.user_id = userId;
          course.save();
          return res.status(200).send({ message: "course alloted" });
        } else {
          if (course.batch) {
            course.batch = "Web Unit-1";
          } else course.batch = "Foundation Unit";
          return res.status(200).send(course);
        }
        res.status(401).send({ message: "wrond courseId" });
      }
      res.status(401).send({ message: "wrong courseId" });
    } catch (error) {
      res.status(401).send(error);
    }
  }
}

module.exports = CourseController;

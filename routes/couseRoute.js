const express = require("express");
const CourseRoute = express.Router();
const { course } = require("../controllers/courseController");

CourseRoute.post("/course", course);
module.exports = {
  CourseRoute,
};

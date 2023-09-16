const express = require("express");
const CourseRoute = express.Router();
const { course } = require("../controllers/CourseController");

CourseRoute.post("/course", course);
module.exports = {
  CourseRoute,
};

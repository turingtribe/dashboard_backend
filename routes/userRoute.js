const express = require("express");
const UserRoute = express.Router();
const { AuthMiddleware } = require("../middleware/authentication");
const {
  register,
  loginUser,
  logOutUser,
  getUserDetails,
  profileDetails,
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/log-in", loginUser);
UserRoute.get("/log-out", AuthMiddleware, logOutUser);
UserRoute.patch("/update-profile", AuthMiddleware, profileDetails);
UserRoute.get("/user-details", AuthMiddleware, getUserDetails);
module.exports = {
  UserRoute,
};

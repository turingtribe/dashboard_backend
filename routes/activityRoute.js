const express = require("express");
const UserRoute = express.Router();
// const {
//   userData,
//   getUserDetails,
// } = require("../controllers/userDeatilsController");

const { AuthMiddleware } = require("../middleware/authentication");
const {
  register,
  loginUser,
  loginByMobile,
  verfiyOTP,
  LogoutUser,
  getUserDetails,
  ProfileDetails,
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/login", loginUser);
UserRoute.get("/logout", AuthMiddleware, LogoutUser);
UserRoute.get("/login-by-number", loginByMobile);
UserRoute.post("/verify", verfiyOTP);
UserRoute.patch("/profile", AuthMiddleware, ProfileDetails);
// UserRoute.post("/details",AuthMiddleware, userData);
// UserRoute.get("/details", getUserDetails);
UserRoute.get("/details",AuthMiddleware, getUserDetails);
module.exports = {
  UserRoute,
};

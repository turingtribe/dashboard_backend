const express = require("express");
const UserRoute = express.Router();
const { AuthMiddleware } = require("../middleware/authentication");
const {
  register,
  loginUser,
  loginByMobile,
  verfiyOTP,
  logOutUser,
  getUserDetails,
  profileDetails,
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/login", loginUser);
UserRoute.get("/logout", AuthMiddleware, logOutUser);
UserRoute.get("/login-by-number", loginByMobile);
UserRoute.post("/verify", verfiyOTP);
UserRoute.patch("/profile", AuthMiddleware, profileDetails);
UserRoute.get("/details", AuthMiddleware, getUserDetails);
module.exports = {
  UserRoute,
};

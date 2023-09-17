const express = require("express");
const UserRoute = express.Router();
const {
  userData,
  getUserDetails,
} = require("../controllers/userDeatilsController");
const {
  register,
  loginUser,
  loginByMobile,
  verfiyOTP,
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/login", loginUser);
UserRoute.get("/login-by-number", loginByMobile);
UserRoute.post("/verify", verfiyOTP);
UserRoute.post("/details", userData);
UserRoute.get("/details", getUserDetails);
module.exports = {
  UserRoute,
};

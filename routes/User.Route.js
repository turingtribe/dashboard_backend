const express = require("express");
const UserRoute = express.Router();
const {
  register,
  LoginUser,
  loginByMobile,
  verfiyOTP,
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/login", LoginUser);
UserRoute.post("/login-by-number", loginByMobile);
UserRoute.post("/verify", verfiyOTP);
module.exports = {
  UserRoute,
};

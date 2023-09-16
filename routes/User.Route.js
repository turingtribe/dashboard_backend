const express = require("express");
const UserRoute = express.Router();
const {
  UserData,
  GETDETAILS,
} = require("../controllers/userDeatilsController");
const {
  register,
  LoginUser,
  loginByMobile,
  verfiyOTP,
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/login", LoginUser);
UserRoute.get("/login-by-number", loginByMobile);
UserRoute.post("/verify", verfiyOTP);
UserRoute.post("/details", UserData);
UserRoute.get("/details", GETDETAILS);
module.exports = {
  UserRoute,
};

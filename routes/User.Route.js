const express = require("express");
const UserRoute = express.Router();
const { register, LoginUser } = require("../controllers/userController");
const {UserData,GETDETAILS} = require("../controllers/userDeatilsController");
UserRoute.post("/register", register);
UserRoute.post("/login", LoginUser);
UserRoute.post("/details", UserData);
UserRoute.get("/details",GETDETAILS);
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

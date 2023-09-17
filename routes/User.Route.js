const express = require("express");
const UserRoute = express.Router();
const {UserData,GETDETAILS} = require("../controllers/userDeatilsController");
const {AuthMiddleware}=require("../middleware/authentication");
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
UserRoute.post("/details", UserData);
UserRoute.get("/details",AuthMiddleware, GETDETAILS);
module.exports = {
  UserRoute,
};

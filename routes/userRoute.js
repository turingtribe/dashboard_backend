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
} = require("../controllers/userController");

UserRoute.post("/register", register);
UserRoute.post("/login", loginUser);
UserRoute.get("/login-by-number", loginByMobile);
UserRoute.post("/verify", verfiyOTP);
// UserRoute.post("/details", userData);
// UserRoute.get("/details", getUserDetails);
// UserRoute.get("/details", AuthMiddleware, getUserDetails);
module.exports = {
  UserRoute,
};

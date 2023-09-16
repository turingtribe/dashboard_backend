const express = require("express");
const UserRoute = express.Router();
const { register, LoginUser } = require("../controllers/userController");
const {UserData,GETDETAILS} = require("../controllers/userDeatilsController");
UserRoute.post("/register", register);
UserRoute.post("/login", LoginUser);
UserRoute.post("/details", UserData);
UserRoute.get("/details",GETDETAILS);
module.exports = {
  UserRoute,
};

const express = require("express");
const UserRoute=express.Router()
const {register,LoginUser}=require("../controllers/userController");

UserRoute.post("/register",register)
UserRoute.post("/login",LoginUser)
module.exports={
  UserRoute
}


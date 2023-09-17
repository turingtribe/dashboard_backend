// Example controller for handling user-related logic
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountSid = "ACd31e56c6da35b7a82e2d848489764653";
const authToken = process.env.SMSTOKEN;
const client = require("twilio")(accountSid, authToken);

//REGISTER USER LOGIC
const register = async (req, res) => {
  const { userName, email, phone, ReferralCode } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      await User.create({
        userName,
        email,
        phone,
        ReferralCode,
        isAdmin: false,
      });
      res.send({message:"User created Successfully"});
    } else {
      res.send("User Already Exist");
    }
  } catch (err) {
    res.send(err);
  }
};

//LOGIN USER LOGIC
const LoginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user?.dataValues?.UserId) {
      var token = jwt.sign({ UserId: user.dataValues.UserId }, "loginornot");
      res.send(token);
    } else {
      res.status(401).send("Wrong Credentials");
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

let rotp = 0;
// login using mobile number
const loginByMobile = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });
    if (user?.dataValues?.UserId) {
      rotp = Math.floor(100000 + Math.random() * 900000);
      client.messages
        .create({
          body: "Hello your otp for Masai School is " + rotp,
          from: "+13347317373",
          to: "+91" + phone,
        })
        .then((message) => console.log(message.sid))
        .done();
      return res.status(200).send({ message: "OTP sent 540321" });
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    return res.status(404).send(error);
  }
};

const verfiyOTP = async (req, res) => {
  const { otp, phone } = req.body;
  const user = await User.findOne({
    where: {
      phone: phone,
    },
  });
  console.log(user);
  if (user?.dataValues?.UserId && otp == rotp) {
    var token = jwt.sign({ UserId: user.dataValues.UserId }, "loginornot");
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).send(token);
  } else {
    return res.status(404).send("not found");
  }
};

module.exports = {
  register,
  LoginUser,
  loginByMobile,
  verfiyOTP,
};

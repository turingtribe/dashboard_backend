// Example controller for handling user-related logic
let otp;
const { User } = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountSid = "ACd31e56c6da35b7a82e2d848489764653";
const authToken = "7f1a563963b32fb9ef2b68d119dae86d";
const client = require("twilio")(accountSid, authToken);
require("dotenv").config();

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
      res.send({ message: "User created Successfully" });
    } else {
      res.send("User Already Exist");
    }
  } catch (err) {
    res.send(err);
  }
};

//LOGIN USER LOGIC
const loginUser = async (req, res) => {
  const { email } = req.body;
  if (req?.query?.otp) {
    if (otp == req.query.otp) {
      const email_verification = await User.findOne({
        where: {
          email: email,
        },
      });
      const token = jwt.sign(
        { userId: email_verification.dataValues.userId },
        "loginornot"
      );
      res.setHeader("Authorization", `${token}`);
      res.send(token);
    } else {
      res.send("wrong otp");
    }
  } else {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user?.dataValues?.userId) {
        otp = Math.floor(100000 + Math.random() * 900000);
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "anmoljagota08@gmail.com",
            pass: process.env.otp_password,
          },
        });

        const info = {
          from: "anmoljagota08@gmail.com",
          to: req.body.email,
          subject: "email verification masai",
          text: `otp is ${otp}`,
        };

        transport.sendMail(info, (err, result) => {
          if (err) {
            console.log(`error in sending mail ${err}`);
          } else {
            res.send("otp send");
          }
        });
      } else {
        res.status(404).send({ message: "Wrong Credentials" });
      }
    } catch (err) {
      res.status(401).send(err);
    }
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
    if (user?.dataValues?.userId) {
      rotp = Math.floor(100000 + Math.random() * 900000);
      client.messages
        .create({
          body: "Hello your otp for Masai School is " + rotp,
          from: "+13347317373",
          to: "+91" + phone,
        })
        .then((message) => console.log(message.sid))
        .done();
      res.status(200).send({ message: "OTP sent 540321" });
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const verfiyOTP = async (req, res) => {
  const { otp, phone } = req.body;
  const user = await User.findOne({
    where: {
      phone: phone,
    },
  });

  if (user?.dataValues?.userId && otp == rotp) {
    var token = jwt.sign({ userId: user.dataValues.userId }, "loginornot");
    res.setHeader("Authorization", `${token}`);
    return res.status(200).send(token);
  } else {
    return res.status(404).send("not found");
  }
};

const LogoutUser = (req, res) => {

    res.removeHeader("Authorization");
  
  res.send("User Logout");
};

//GET USER DETAILS
const getUserDetails = async (req, res) => {
  const finduser = req.body.userId;
  console.log(finduser,"finduser")
  try {
    const getuser = await User.findOne({
      where: { userId: finduser },
    });
    res.send(getuser);
  } catch (err) {
    res.send(err);
  }
};

const ProfileDetails = async (req, res) => {
  const finduser = req.body.userId;
 
  const { profileImage, dob, work, graduation, adharCard } = req.body;
console.log(profileImage,"profileimage")
  try {
    // Find the user by ID
    const user = await User.findByPk(finduser);
    console.log(user.email, "user...");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if (!dob) {
    //   user.dob = dob;
    // }
   if(profileImage!==undefined){
      user.profileImage = profileImage;
   }
    if (work!==undefined) {
      user.work = work;
    }
    if (graduation!==undefined) {
      user.graduation = graduation;
    }
    if (adharCard!==undefined) {
      user.adharCard = adharCard;
    }
    await user.save();
    res.send("profile updated");
    // return res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  loginUser,
  loginByMobile,
  verfiyOTP,
  LogoutUser,
  getUserDetails,
  ProfileDetails,
};

// userDetails code
// const { UserDetail } = require("../models/userModel");
// const userData = async (req, res) => {
//   try {
//     const { profileImage, dob, graduation, work, adharCard } = req.body;

//     await UserDetail.create({ profileImage, dob, graduation, work, adharCard });
//     res.send("User Details Added");
//   } catch (err) {
//     console.log(err);
//     res.send(`some error to create userDetails ${err}`);
//   }
// };

// module.exports = { userData, getUserDetails };

// Example controller for handling user-related logic
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountSid = "ACd31e56c6da35b7a82e2d848489764653";
const authToken = "7f1a563963b32fb9ef2b68d119dae86d";
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
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user?.dataValues?.userId) {
      var token = jwt.sign({ UserId: user?.dataValues?.UserId }, "loginornot");
      // res.setHeader("Authorization", `Bearer ${token}`);
      res.send(token);
    } else {
      res.status(404).send({ message: "Wrong Credentials" });
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
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).send(token);
  } else {
    return res.status(404).send("not found");
  }
};

module.exports = {
  register,
  loginUser,
  loginByMobile,
  verfiyOTP,
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

// //GET USER DETAILS
// const getUserDetails = async (req, res) => {
//   const finduser = req.body.UserId;
//   try {
//     const getuser = await UserDetail.findOne({
//       where: { UserDetailsId: finduser },
//     });
//     console.log(getuser);
//     res.send(getuser);
//   } catch (err) {
//     res.send(err);
//   }
// };

// module.exports = { userData, getUserDetails };

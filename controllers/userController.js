// Example controller for handling user-related logic
let otp;
const { User } = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Activity = require("../models/activitiesModel");
require("dotenv").config();
const accountSid = process.env.SMSSID;
const authToken = process.env.SMSTOKEN;
const client = require("twilio")(accountSid, authToken);

//REGISTER USER LOGIC
const register = async (req, res) => {
  const { userName, email, phone, ReferralCode } = req.body;
  try {
    const mobileRegex = new RegExp(/^((\+91)? |\+)?[ 7-9][0-9]{9}$/);
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!mobileRegex.test(phone) || !emailRegex.test(email))
      res.status(401).send({ message: "wrong credentials" });
    else {
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
        res.status(200).send({ message: "User created Successfully" });
      } else {
        res.status(401).send("User Already Exist");
      }
    }
  } catch (err) {
    res.send(err);
  }
};

//LOGIN USER LOGIC
const loginUser = async (req, res) => {
  const { value } = req.body;
  // console.log(value);
  const mobileRegex = new RegExp(/^((\+91)? |\+)?[ 7-9][0-9]{9}$/);
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (req?.query?.otp) {
    if (otp == req.query.otp) {
      if (emailRegex.test(value)) {
        const email_verification = await User.findOne({
          where: {
            email: value,
          },
        });
        const token = jwt.sign(
          { userId: email_verification.dataValues.userId },
          "loginornot"
        );
        res.setHeader("Authorization", `${token}`);
        res.status(200).send(token);
      } else if (mobileRegex.test(value)) {
        const mobile_verification = await User.findOne({
          where: {
            phone: value,
          },
        });
        const token = jwt.sign(
          { userId: mobile_verification.dataValues.userId },
          "loginornot"
        );
        res.setHeader("Authorization", `${token}`);
        res.status(200).send(token);
      }
    } else {
      res.status(401).send({ message: "wrong otp" });
    }
  } else if (emailRegex.test(value)) {
    try {
      const user = await User.findOne({
        where: {
          email: value,
        },
      });

      if (user?.dataValues?.userId) {
        otp = Math.floor(100000 + Math.random() * 900000);
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "raibivek58@gmail.com",
            pass: process.env.EMAILPASSWORD,
          },
        });

        const info = {
          from: "raibivek58@gmail.com",
          to: value,
          subject: "email verification Masai",
          html: `
                <b>Hello!</b>
                <p>You are receiving this email because we received an OTP request for your account.</p>
                <p>${otp}</p>
                <p>If you did not request an OTP, no further action is required.</p>
                <p>Regards,</p>
                <p>Masai School</p>
              `,
        };

        transport.sendMail(info, (err, result) => {
          if (err) {
            console.log(`error in sending mail ${err}`);
          } else {
            res.status(200).send({ message: "OTP sent" });
          }
        });
      } else {
        res.status(404).send({ message: "Wrong Credentials" });
      }
    } catch (err) {
      res.status(401).send(err);
    }
  } else {
    if (mobileRegex.test(value)) {
      const user = await User.findOne({
        where: {
          phone: value,
        },
      });
      if (user?.dataValues?.userId) {
        otp = Math.floor(100000 + Math.random() * 900000);
        client.messages
          .create({
            body: `Masai School says: Here's your OTP: ${otp}. Don't worry if you didn't ask for it, just ignore.`,
            from: "+13347317373",
            to: "+91" + value,
          })
          .then((message) => console.log(message.sid));
        res.status(200).send({ message: "OTP sent " + otp });
      } else {
        res.status(404).send("not found");
      }
    } else {
      res.status(401).send({ message: "wrong phone number" });
    }
  }
};

const logOutUser = (req, res) => {
  res.removeHeader("Authorization");
  res.send("User Logout");
};

//GET USER DETAILS
const getUserDetails = async (req, res) => {
  const finduser = req.body.userId;
  console.log(finduser, "finduser");
  try {
    const getuser = await User.findOne({
      where: { userId: finduser },
    });
    res.send(getuser);
  } catch (err) {
    res.send(err);
  }
};

const profileDetails = async (req, res) => {
  const finduser = req.body.userId;
  const { profileImage, dob, work, graduation, adharCard } = req.body;
  console.log(profileImage, "profileimage");
  try {
    // Find the user by ID
    const user = await User.findByPk(finduser);
    console.log(user.email, "user...");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (dob != undefined) {
      user.dob = dob;
    }
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }
    if (work !== undefined) {
      user.work = work;
    }
    if (graduation !== undefined) {
      user.graduation = graduation;
    }
    if (adharCard !== undefined) {
      user.adharCard = adharCard;
    }
    await user.save();
    res.status(200).send("profile updated");
    // return res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  loginUser,
  logOutUser,
  getUserDetails,
  profileDetails,
};

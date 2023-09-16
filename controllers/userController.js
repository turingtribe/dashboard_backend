// Example controller for handling user-related logic
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
      await User.create({ userName, email, phone, ReferralCode });
      res.send("User created Successfully");
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
      res.send("Wrong Credentials");
    }
  } catch (err) {
    res.send(err);
  }
};



module.exports = {
  register,
  LoginUser,
};

const { UserDetail } = require("../models/userDetailsModel");
const userData = async (req, res) => {
  try {
    const { profileImage, dob, graduation, work, adharCard } = req.body;

    await UserDetail.create({ profileImage, dob, graduation, work, adharCard });
    res.send("User Details Added");
  } catch (err) {
    res.send("some error to create userDetails");
  }
};

//GET USER DETAILS
const getUserDetails = async (req, res) => {
  const finduser = req.body.UserId;
  try {
    const getuser = await UserDetail.findOne({
      where: { UserDetailsId: finduser },
    });
    console.log(getuser);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { userData, getUserDetails };

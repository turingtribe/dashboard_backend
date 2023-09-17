const { UserDetail } = require("../models/userDetailsModel");
const UserData = async (req, res) => {
  try {
    const { profileImage, dob, graduation, work, adharCard } = req.body;

    await UserDetail.create({ profileImage, dob, graduation, work, adharCard });
    res.send("User Details Added");
  } catch (err) {
    console.log(err);
    res.send(`some error to create userDetails ${err}`);
  }
};

//GET USER DETAILS
const GETDETAILS = async (req, res) => {
  const finduser = req.body.userId;
  try {
    const getuser = await UserDetail.findOne({
      where: { UserDetailsId: finduser },
    });
    console.log(getuser);
    res.send(getuser);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { UserData, GETDETAILS };

const { Msat } = require("../models/MsatModel");
const { User } = require("../models/userModel");
const msat = async (req, res) => {
  try {
    await Msat.create(req.body);
    res.send("Msat Created");
  } catch (err) {
    res.send(err);
  }
};

const getAllMsat = async (req, res) => {
  try {
    const user = await User.findAll();
    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(501).send("Sorry not found");
  }
};
module.exports = { msat, getAllMsat };

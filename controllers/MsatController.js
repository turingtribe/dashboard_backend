const {Msat}= require("../models/MsatModel");
const msat = async (req, res) => {
   
  try {
    await Msat.create(req.body);
    res.send("Msat Created");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { msat };
const {Options}= require("../models/options");

const msatOption= async (req, res) => {
   
  try {
    await Options.create(req.body);
    res.send("Msat option added");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { msatOption };
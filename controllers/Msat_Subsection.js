const {MsatSubSection}= require("../models/Msat_Subsection");
const msatSubSection = async (req, res) => {
   
  try {
    await MsatSubSection.create(req.body);
    res.send("MsatSubSection Created");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { msatSubSection };
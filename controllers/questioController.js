const {Question}= require("../models/question");

const msatQuestion = async (req, res) => {
   
  try {
    await Question.create(req.body);
    res.send("MsatQuestion Created");
  } catch (err) {
    res.send(err);
  }
};

module.exports = { msatQuestion };
const express = require("express");
const MsatRoute = express.Router();
const { msat } = require("../controllers/MsatController");
const {msatSubSection}=require("../controllers/Msat_Subsection");
const {msatQuestion}=require("../controllers/Questios")
const {msatOption}=require("../controllers/Options")
MsatRoute.post("/msat", msat);
MsatRoute.post("/msatsub",msatSubSection)
MsatRoute.post("/msatquestion",msatQuestion)
MsatRoute.post("/msatoption",msatOption)
module.exports = {
  MsatRoute,
};
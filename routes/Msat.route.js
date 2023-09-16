const express = require("express");
const MsatRoute = express.Router();
const { msat } = require("../controllers/MsatController");

MsatRoute.post("/msat", msat);
module.exports = {
  MsatRoute,
};
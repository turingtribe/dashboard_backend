const express = require("express");
const { MsatController } = require("../controllers/msat_Controller");

const msatRouter = express.Router();

const msatController = new MsatController();
msatRouter.post("/msat", msatController.createModels);

module.exports = { msatRouter };

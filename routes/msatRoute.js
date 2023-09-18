const express = require("express");
const { MsatController } = require("../controllers/msat_Controller");
const { AuthMiddleware } = require("../middleware/authentication");
const msatRouter = express.Router();

const msatController = new MsatController();
msatRouter.post("/msat", msatController.createModels);
msatRouter.get("/msat", msatController.getAllMsat);
msatRouter.patch("/score", msatController.calculateScore);
msatRouter.patch(
  "/register-msat/:msatId",
  AuthMiddleware,
  msatController.registerMsat
);
msatRouter.get("/user-score", AuthMiddleware, msatController.userScore);
module.exports = { msatRouter };

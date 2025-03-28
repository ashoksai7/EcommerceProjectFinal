const express = require('express');
const authRouter = express.Router();

//Importing controllers frm controller folder for userControls and productControls
const {signupController,loginController,protectRouteMiddleWare,getUserData, logoutController} = require("../controller/authController");

//Importing sanityMiddleWare from midddle wares
const {payLoadSanity} = require("../middlewares/sanityOfPayload");

authRouter.route("/login").post(loginController);
authRouter.route("/logout").post(logoutController);
authRouter.route("/getUserData").get(protectRouteMiddleWare,getUserData);
module.exports = authRouter;



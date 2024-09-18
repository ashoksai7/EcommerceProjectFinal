const express = require('express');
const userRouter = express.Router();

//Importing controllers frm controller folder for userControls and productControls
const {addUser,getUsers,getUserById,getUserByName,updateUser,deleteUser} = require("../controller/userController");

//Importing sanityMiddleWare from midddle wares
const {payLoadSanity} = require("../middlewares/sanityOfPayload");

userRouter.route("/").post(payLoadSanity,addUser).get(getUsers);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);
userRouter.route("/name/:name").get(getUserByName);

module.exports = userRouter;
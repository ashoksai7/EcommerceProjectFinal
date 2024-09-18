const express = require('express');
const bookingRouter = express.Router();

//Importing controllers frm controller folder for bookingController
const { initialBooking, getAllBookings, confirmBooking, userOrder } = require('../controller/bookingController');

//Importing sanityMiddleWare from midddle wares
const {payLoadSanity} = require("../middlewares/sanityOfPayload");
const {protectRouteMiddleWare} = require("../poc/3_auth/auth");


bookingRouter.route("/").get(getAllBookings);
bookingRouter.route("/checkout").post(protectRouteMiddleWare,initialBooking);
bookingRouter.route("/verify").post(confirmBooking);
bookingRouter.route("/orders").get(userOrder);

module.exports = bookingRouter;



const express = require('express');
const reviewRouter = express.Router();

//Importing controllers frm controller folder for reviewRouter
const { getAllReviews, productReview} = require('../controller/reviewController');

//Importing sanityMiddleWare from midddle wares
const {protectRouteMiddleWare} = require("../poc/3_auth/auth");


reviewRouter.route("/:productId").get(productReview);
//Entire reviews present in the DB. Only accessible by admin
reviewRouter.route("/").get(getAllReviews);


module.exports = bookingRouter;



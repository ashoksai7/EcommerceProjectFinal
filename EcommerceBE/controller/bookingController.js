const bookingModel = require("../models/bookingModel");
const { productModel } = require("../models/productModel");
const { userModel } = require("../models/userModel");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({path:path.join("../.env")});
const {RAZORPAY_PUBLIC_KEY,RAZORPAY_PRIVATE_KEY,WEBHOOK_SECRET} = process.env;
const Razorpay = require("razorpay");
const crypto = require("crypto");

var razorpayInstance = new Razorpay({
    key_id: RAZORPAY_PUBLIC_KEY,
    key_secret: RAZORPAY_PRIVATE_KEY
});


async function initialBooking(req,res){
    try {
        //1. User logged in? -> Token -> userid
        const userId = req.userId;
        const user = await userModel.findById(userId);
        //2. Productid -> frontend
        const productId = req.body.productId;
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        //3. Search the product -> get its price
        const price = product.price; // eg: 500 rupees
        const payment_capture = 1;
        const orderConfig = {
            amount:price*100,
            currency:"INR",
            payment_capture
        }
        //4. Create an order via razorpay -> order_id
        
        const order = await razorpayInstance.orders.create(orderConfig);
        //5. Create an actual booking
        const bookingDetails = {
            price,
            payment_order_id:order.id,
            user:userId,
            product:productId
        }
        const booking = await bookingModel.create(bookingDetails);
        //console.log(user.bookings);
        user.bookings.push(booking["_id"]);
        //console.log(user.bookings);
        await user.save();
        //6. Return the order to FE
        res.status(200).json({
            status:"success",
            message:{
                order,
                email:user.email,
                name:user.name,
                receipt:booking["_id"]
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
}

async function getAllBookings(req,res){
    //This should only be accessed by Admin. RBAC(Role based access control)
    try {
        console.log("request to show all bookings")
        const bookings = await bookingModel.find().populate({path:"user",select:"name email"}).populate({path:"product",select:"price discount category"});
        res.status(200).json({
            status: "success",
            message: bookings
        })
    } catch (error) {
        
    }
}

async function confirmBooking(req,res){
    try{
        //1. Fetch the signature from the header.
        const incomingSignature = req.headers["x-razorpay-signature"];
        //2. Create a fresh signature from webhook secret and encryption
        const shasum = crypto.createHmac("sha256",WEBHOOK_SECRET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature = shasum.digest("hex");
        //3. Match header signature and fresh signature
        if(freshSignature === incomingSignature){
            //3.1 Get the order_id from the request
            const body = req.body;
            const order_id = body.payload.payment.entity.order_id;
            const event = body.event;
            const booking = await bookingModel.find({
                payment_order_id:order_id
            })
            if(event === "payment.captured"){
                //Update the status of booking to success
                booking.status = "success";
                await booking.save();
            }else{
                booking.status = "failure";
                await booking.save();
            }
            console.log("signature is valid");
            res.status(200).json({message:"success"})
        }
        else{
            console.log("signature is invalid");
            res.status(400).json({message:"invalid"});
        }
    }
    catch(err){
        console.log(err);
    }
}

async function userOrder(req,res){
    try {
        const userId = req.userId;
        const bookings = await userModel.findById(userId).populate("bookings");
        populate("bookings");
        res.status(200).json({
            status:"success",
            message:{
                bookings
            }
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message:"server error"
        })
    }
}

module.exports={
    initialBooking,
    getAllBookings,
    confirmBooking,
    userOrder
}
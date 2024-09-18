const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const Razorpay = require("razorpay");
const exp = require("constants");
dotenv.config({path:path.join("../../",".env")});
const {RAZORPAY_PUBLIC_KEY,RAZORPAY_PRIVATE_KEY,WEBHOOK_SECRET} = process.env;
console.log(RAZORPAY_PRIVATE_KEY,RAZORPAY_PUBLIC_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.post("/checkout",async (req,res)=>{
    try {
        //get the required data for checkout
        const amount = 500; //is in the smallest unit of currency. Eg: paise for INR, cents for USD
        //currency
        const currency = "INR";

        const receipt = `rp_${uid.rnd()}`;

        var razorpayInstance = new Razorpay({
            key_id: RAZORPAY_PUBLIC_KEY,
            key_secret: RAZORPAY_PRIVATE_KEY
          });
        
        const orderConfig = {
            amount : amount*100,
            receipt,
            currency
        }

        const order = await razorpayInstance.orders.create(orderConfig);
        //console.log(order);
        res.status(200).json({
            status:"success",
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
});

app.post("/verify",async (req,res)=>{
    try{
        //1. Fetch the signature from the header.
        const incomingSignature = req.headers["x-razorpay-signature"];
        //2. Create a fresh signature from webhook secret and encryption
        const shasum = crypto.createHmac("sha256",WEBHOOK_SECRET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature = shasum.digest("hex");
        //3. Match header signature and fresh signature
        if(freshSignature == incomingSignature){
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
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})
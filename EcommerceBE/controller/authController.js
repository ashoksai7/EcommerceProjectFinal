//Create three routes to create signup, login, protect(optional)
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const path = require("path");
const emailSender = require("../poc/4_email/dynamicEmail");
const bcrypt = require("bcrypt");
//Using rate limiter to limit number of requests.
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15*60*1000,
    limit:3,
    keyGenerator:function(req,res){
        return req.userId;
    }
})

//including env variables
dotenv.config({path:path.join("../",".env")});

const { PORT, MONGODBPASSWORD, USERID, JWT_SECRET, HOST_NAME } = process.env;

const promisifiedJWTsign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);

//const emailSender = require("./2_dynamicMailSender");

/*******************************Connection to our DB*************************/
//const dbURL = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.uubiman.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

//only done once
// mongoose.connect(dbURL)
//     .then(function(Connection){
//         console.log("connected to DB");
//     }).catch(err => console.log(err))

const {userModel} = require("../models/userModel");
const { fail } = require("assert");
//const path = require("path");

/********************************************************/
const app = express();
/*** to get the data in req.body **/
app.use(express.json());
/*** to get the cookie in req.cookie**/
app.use(cookieParser());

/******** 
 * 1. signup
 * 2. login
 * 3. /allowIfLoggedIn -> allows you to access getUserData if user is authenticated 
 *  
*/


const signupController = async(req,res) =>{
    try {
        //get the user details
        const userDetails = req.body;
        //create the user
        const user = await userModel.create(userDetails);
        //send email
        await emailSender("signup.html",user.email,{name:user.name});
        res.status(201).json({
            message:"user created",
            newUser: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"fail"
        })
    }
}

const loginController = async(req,res) =>{
    try {
        /**
         * 1. email and password -> in payload -> yes/no -> 400
         * 2. check if email exist in DB -> yes/no -> user not found
         * 3. email and password -> not correct -> pass/email not correct
         * 4. create and send token -> payload
         * 5. send the response user is logged in
        */

        // 1.
        const {email,password} = req.body;
        //console.log(req.cookies);
        if(!email || !password){
            return res.status(400).json({
                message: "email and password are required"
            })
        }

        //2.
        const user = await userModel.findOne({email}).lean();
        // If we use any of the inbuilt mongoose
        // functions suh as pre, post and populate
        // then lean won't work. Always use lean if
        // no further processing of data is required.
        // Lean would return Plain Old Java Object(POJO)
        // without any additional mongoose methods etc.,
        if(!user){
            //redirect to signup page
            return res.status(400).json({
                message:"user not found"
            })
        }

        //3.
        const isSame = await bcrypt.compare(password,user.password);
        /**
         * In above step though we did not pass
         * random salt to compare function we
         * are able to compare. This is because
         * random salt is the part(sub string)
         * of hashedPassword(password stored in DB) itself.
         * Go through bcrypt.js in this sanme folder to
         * understand better
         */
        console.log("result",isSame);
        if(!isSame){
            console.log("User password",user.password);
            return res.status(400).json({
                message:"email/password is incorrect"
            })
        }

        //4.
        const authToken = await promisifiedJWTsign({id:user["_id"]},JWT_SECRET);
        res.cookie("jwt",authToken,{maxAge:9000000, httpOnly: true});
        res.status(201).json({
            message:"user logged in",
            user,
            authToken
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"fail"
        })
    }
}

//A middleware to check the login status of user using JWT
const protectRouteMiddleWare = async(req,res,next)=>{
    /**
     * 1. check for JWT token -> if yes then move to next step
     * 2. verify the token -> if yes  move to next step -> if no -> return 401
     * 3. you can add that property to req object and call next
     */
    try{
        console.log(req.cookies);
        let jwt = req.cookies.jwt;
        if(!jwt){
            return res.status(400).json({
                message:"pls login first"
            })
        }

        const decryptedToken = await promisifiedJWTVerify(jwt,JWT_SECRET);
        const userId = decryptedToken.id;
        req.userId = userId;
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"fail"
        })
    }
}

const checkIfAdmin = async (req,res,next) => {
    try {
        const id = req.userid;
        const user = await findById(id);
        if(user.role == "admin")
            next();
        else
            res.status(403).json({
                message:"You are not authorized to access this route",
                status:"fail"
            })
    } catch (error) {
        res.status(500).json({
            error:error.message,
            status:fail
        })
    }
}

const getUserData = async(req,res) => {
    try {
        const id = req.userId;
        const userProfile = await userModel.findById(id);
        res.status(200).json({
            userProfile,
            status:"success"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"fail"
        })
    }
}

const getAllUserData = async(req,res) =>{
    try {
        const allUserData = await userModel.find();
        return res.status(200).json({
            allUserData
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:err.message,
            status:"fail"
        })
    }
}

const otpGenerator = function(){
    return Math.floor(Math.random()*10000);
}

const forgetPasswordController = async (req,res) => {
    // 1. take email from user
    // 2. check if user exists and if user doesn't exist send fail message
    // 3. if user exists -> we create otp -> we send email containing otp
    // 4. store otp in userModel
    // 5. response -> give a unique url with id of the user through which user can reset password
    try{
        if(req.body.email == undefined){
            return res.status(401).json({
                status:"fail",
                message:"please enter the email"
            })
        }

        let user = await userModel.findOne({email:req.body.email});
        if(user == null){
            return res.status(401).json({
                status:"fail",
                message:"user not registered"
            })
        }
        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10*60*1000;
        await user.save();

        //send email with reset url and OTP

        res.status(200).json({
            status:"success",
            message:"otp sent to your email",
            resetUrl : `http://${HOST_NAME}:${PORT}/resetPassword/${user["_id"]}`,
            otp
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: err.message,
            status: "fail"
        })
    }
}

const resetPasswordController = async (req,res) => {
    //1. We should get otp,password,nextPassword
     try {
         let {password,confirmPassword,otp} = req.body;
         if(!password || !confirmPassword || !otp){
             return res.status(401).json({
                 message:"Invalid request. otp, password and confirmPasssword are required"
             })
         }
         const user = await userModel.findById(req.params.id);

         if(user == null){
            return res.status(401).json({
                status : "fail",
                message: "user not found"
            })
         }

         if(user.otp == undefined){
            return res.status(400).json({
                message: "incorrect request please use forgot password link before trying to reset your password"
            })
         }

         if(Date.now()>user.otpExpiry){
             return res.status(401).json({
                 message: "otp is expired"
             })
         }

         if(user.otp!==otp){
             return res.status(401).json({
                 message: "otp is incorrect"
             })
         }

         if(password!=confirmPassword){
             return res.status(401).json({
                 message: "password and confirm password are not matching"
             })
         }

         user.password = password;
         user.confirmPassword = confirmPassword;

         user.otp = undefined;
         user.otpExpiry = undefined;

         await user.save();

         res.status(200).json({
             message:"password reset successful",
         })

     } catch (error) {
        return res.status(500).json({
            error:error.message,
            status:"fail"
        })
     }
}

/********************** routes *********************/
app.post("/signup",signupController);
app.post("/login",loginController);
app.patch("/forgetPassword",forgetPasswordController);
app.patch("/resetPassword/:id",resetPasswordController);
//show profile data
app.get("/allowIfLoggedIn",protectRouteMiddleWare,limiter,getUserData);
app.get("/allowIfAdmin",protectRouteMiddleWare,checkIfAdmin,getAllUserData);

// app.listen(PORT,function () {
//      console.log(`Server is listening on port`, PORT);
//  })

module.exports = {signupController,loginController,protectRouteMiddleWare};
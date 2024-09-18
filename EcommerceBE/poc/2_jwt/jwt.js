const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
const util = require("util");
const { errorMonitor } = require("events");
const promisify = util.promisify;
const promisifiedJWTsign = promisify(jwt.sign);
const promisifiedJWTverify=promisify(jwt.verify);

app.use(cookieParser());

const SECRET = "grhyirtcxgbnhjki";
const payload = "224567f";

//I will set a cookie below

app.get("/sign", async function(req, res){
    try{
        var authToken = await promisifiedJWTsign({payload},SECRET,{algorithm:"HS256"});
        res.cookie("jwt",authToken,{
            //life of cookie
            maxAge: 24*60*60*1000,
            //your cookie can't be tampered by client side script
            httpOnly: true,
            //Ensures the cookie is sent over https connections, added layer of security so that cookie is not transferred over unencrypted http
            secure:true
        })
        res.status(200).json({
            message: "signed the JWT and sending it in cookies",
            authToken
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

app.get("/verify", async function(req,res){
    try {
        //getting all the cookies wrt hostname
        let jwt = req.cookies.jwt;
        if(jwt){
            const descryptedToken = await promisifiedJWTverify(jwt,SECRET);
            res.status(200).json({
                message:"JWT is verfied",
                descryptedToken
            });
        }
        else{
            res.status(400).json({
                message:"No JWT found"
            });
        }
        let messageStr = "";
        if(req.cookies && req.cookies.prevpage){
            messageStr = `You have already visited ${req.cookies.prevpage}`
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
})

app.listen(3001,function () {
    console.log(`Server is listening on port 3001`);
})
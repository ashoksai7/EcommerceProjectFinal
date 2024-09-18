const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//I will set a cookie below

app.get("/", function(req, res){
    try{
        res.cookie("prevpage","home",{
            //life of cookie
            maxAge: 24*60*60*1000,
            //your cookie can't be tampered by client side script
            httpOnly: true,
            //Ensures the cookie is sent over https connections, added layer of security so that cookie is not transferred over unencrypted http
            secure:true
        })
        res.status(200).json({
            message: "thank you for the visit"
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

app.get("/product",function(req,res){
    //getting all the cookies wrt hostname
    let messageStr = "";
    if(req.cookies && req.cookies.prevpage){
        messageStr = `You have already visited ${req.cookies.prevpage}`
    }
    res.status(200).json({
        message:messageStr
    })
})


//clear your cookies -> on a server
app.get("/clearCookies",function(req,res){
    res.clearCookie("prevpage",{path:"/"});
    res.status(200).json({
        message:"I have cleared the cookie"
    })
})
app.listen(3001,function () {
    console.log(`Server is listening on port 3001`);
})
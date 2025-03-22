//to use .env file contents
require('dotenv').config();
//console.log(process.env);

const {USERID,MONGODBPASSWORD,PORT} = process.env;
const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.uubiman.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


//using express to create app
const express = require('express');
const app = express();

//using cors to allow cross origin resource sharing. In this case our initial front end and current backend
const corsConfig = {
    origin:true,
    credentials:true
}
const cors = require('cors');
app.use(cors(corsConfig));
//Can also use options in app with cors config to allow everyone to connect
app.options("*",cors(corsConfig)); // * means to allow everyone. Otherwise we can mention just the urls which we want to allow


//Using rate limiter to limit number of requests.
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15*60*1000,
    limit:100
})

//DB connection
const mongoose = require('mongoose');
mongoose.connect(dbUrl).then(connection=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err.message);
});

//To be able to handle cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser())

//Creating routes. Learn more online
const userRouter = require("./routes/userRouter");
const prodRouter = require("./routes/productRouter");
const bookingRouter = require("./routes/bookingRouter");
//const reviewRouter = require("./routes/reviewRouter");

const {loginController,protectRouteMiddleWare} = require("./poc/3_auth/auth");

//app.use is the middleware
app.use(function(req,res,next){
    console.log("received req");
    next();// this will indicate the code to continue to next block
})


// This middleware is convert any JSONS received from requests to understandable JSON format
app.use(express.json()); 

//to add new user to DB below post method can be used
/*  In below post method we are using sanityMiddleWare as a middleware
    to validate whether new user details are empty
*/


//app.post("/api/user",payLoadSanity,addUser);
//app.delete("/api/user/:id",deleteUser);
//app.get("/api/user",loginController);
// app.get("/api/user/:id",getUserById);
// app.get("/api/user/name/:name",getUserByName);
// app.patch("/api/user/:id",updateUser);

// app.post("/api/product",payLoadSanity,addProduct);
// app.delete("/api/product/:id",deleteProduct);
// app.get("/api/product",getAllProducts);
// app.get("/api/product/:id",getProductById);
// app.get("/api/product/name/:name",getProductByName);
// app.patch("/api/product/:id",updateProduct);

app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',prodRouter);
app.use('/api/v1/booking',bookingRouter);
//app.use('/api/v1/review',reviewRouter);

app.post('/api/v1/login',loginController);

app.listen(PORT,function(req,res){
    console.log("app is listening on port",PORT);
})

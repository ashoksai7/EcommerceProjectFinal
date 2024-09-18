/*to use .env file contents from this file we have to
use the path module as this file and .env file are not
at same directory level*/
const path = require("path");
require('dotenv').config({path:path.join(__dirname,"../",".env")});
//console.log(process.env);
const {USERID,MONGODBPASSWORD,PORT} = process.env;
const dbUri = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.uubiman.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

//using express to create app
const express = require('express');
const app = express();

//DB connection
const mongoose = require('mongoose');
mongoose.connect(dbUri).then(connection=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err.message);
});



//Creating routes. Learn more online
// const userRouter = require("./routes/userRouter");
// const prodRouter = require("./routes/productRouter");



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
// app.get("/api/user",getUsers);
// app.get("/api/user/:id",getUserById);
// app.get("/api/user/name/:name",getUserByName);
// app.patch("/api/user/:id",updateUser);

// app.post("/api/product",payLoadSanity,addProduct);
// app.delete("/api/product/:id",deleteProduct);
// app.get("/api/product",getAllProducts);
// app.get("/api/product/:id",getProductById);
// app.get("/api/product/name/:name",getProductByName);
// app.patch("/api/product/:id",updateProduct);

// app.use('/api/user',userRouter);
// app.use('/api/product',prodRouter);


const {productModel} = require("../models/productModel");
app.get("/api/user/:id",function(req,res){
    const {params,query} = req;
    console.log(req);
    res.status(200).json({
        message:"request handled successfully",
        data:{
        "queryParams":query,
        "params":params
        }
    })
})

app.get("/api/product",async(req,res)=>{
    //sort paginate and limit
    const {query:{sort,page,limit}} = req;
    //sort params
    let fetchQuery = productModel.find();
    if(sort){
        let [prop,order] = sort.split("_");
        console.log(prop,order);
        //sort method on product model only understands 1 and -1
        order = order=="asc"?1:-1;
        fetchQuery = fetchQuery.sort({[prop]:order});
    }
    //console.log(prop,order,page,limit);

    

    //page wise division
    let ppp=2;
    if(page){
        let prodToSkip = (page-1)*ppp;
        fetchQuery = fetchQuery.skip(prodToSkip).limit(ppp);
    }
    if(limit)
        fetchQuery = fetchQuery.limit(limit);

    //using sort and skip methods of model to achieve the desired sort and page wise content
    //let fetchQuery = productModel.find().sort({[prop]:order}).skip(prodToSkip).limit(ppp);
    let data = await fetchQuery;
    res.status(200).json({data:data});
})

app.listen(PORT,function(req,res){
    console.log("app is listening on port",PORT);
})


//npm package: mongoose.paginate can be explored for smarter way to create paginations in yout page

//Use aggregate pipelines helps us to efficiently group our operations on the data like find,sort and limit etc.,
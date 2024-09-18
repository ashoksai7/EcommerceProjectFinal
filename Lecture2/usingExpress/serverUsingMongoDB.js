const dbUri = "mongodb+srv://ashoksai7:3AGduedp2KGeCNHQ@cluster0.uubiman.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const express = require('express');

const mongoose = require('mongoose');

const app = express();

const {v4:uuidv4}  = require('uuid');

const {userModel} = require("./userModel");

app.use(express.json()); // This middleware is convert any JSONS received from requests to understandable JSON format

//app.use is the middleware
app.use(function(req,res,next){
    console.log("received req");
    next();// this will indicate the code to continue to next block
})


mongoose.connect(dbUri).then(connection=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err.message);
});


const addUser = (req,res)=>{
    console.log("Adding user");
}

const getUsers = async (req,res)=>{
    console.log("Sending users details");
    const allUsersData = await userModel.find({});
    res.status(200).json({
        message: "user data list",
        data: allUsersData});
}
const updateUser = (req,res)=>{
    console.log("Updating user");
}
const deleteUser = (req,res)=>{
    console.log("Deleting user");
}
const sanityMiddleWare=(req,res,next)=>{
    try{
        let user = req.body;
        let isEmpty = Object.keys(user).length==0;
        if(isEmpty){
            res.status(400).json({
                status: "fail",
                message:"Please do not provide empty user details"})
        }
        else
            next();
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
app.get("/user",getUsers);
app.post("/user",addUser);
app.put("/user",updateUser);
app.delete("/user",deleteUser);

//to add new user to DB below post method can be used
/*  In below post method we are using sanityMiddleWare as a middleware
    to validate whether new user details are empty
*/
app.post("/api/user",sanityMiddleWare,async (req,res)=>{
    try{
        //get new user
        let newUser = req.body;
        console.log(newUser);

        const user = await userModel.create(newUser);
        
    
        //respond with success
        res.status(200).json({message:"User added successfully",user});
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

app.delete("/api/user/:id",async (req,res)=>{
    try{
        //storing params passed by request into the variables. In this case "id" is the only param passed.
        const {id} = req.params;

        const userToDelete = await userModel.findByIdAndDelete(id);

        //Delete if user found and respond with error if user not found

        console.log(userToDelete);
        if(userToDelete){
            res.status(200).json({
                message:"user deleted successfully"
            })
        }
        else{
            res.status(400).json({
                message: "Please provide a valid user id"
            })
        }
        
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get("/api/user/:id",async (req,res)=>{
    try{
        //storing params passed by request into the variables. In this case "id" is the only param passed.
        const {id} = req.params;

        //Using findOne method available in useerModel to fetch the detail of one document with specified value
        //let currUserData = await userModel.findOne({ _id: id });
        let currUserData = await userModel.findById(id);

        //Delete if user found and respond with error if user not found
        console.log(currUserData);
        if(!currUserData){
            res.status(400).json({
                message:"user not found"
            })
        }
        else{
            res.status(200).json({
                message:" User data fetched",
                data:currUserData
            })
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.listen(3000,function(req,res){
    console.log("app is listening on port 3000");
})

  //Homework
  //findByIdAndDelete
  //findByIdAndUpdate
  //getAllUsers

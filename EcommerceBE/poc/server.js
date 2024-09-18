const express = require('express');

const fs = require('fs');

const userDataDB = JSON.parse(fs.readFileSync('./dev-data.json','utf-8'));

const app = express();

const {v4:uuidv4}  = require('uuid');


app.use(express.json()); // This middleware is convert any JSONS received from requests to understandable JSON format

//app.use is the middleware
app.use(function(req,res,next){
    console.log("received req");
    next();// this will indicate the code to continue to next block
})

const addUser = (req,res)=>{
    console.log("Adding user");
}

const getUsers = (req,res)=>{
    console.log("Sending users details");
    res.status(200).json({
        message: "user data list",
        data: userDataDB});
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
app.post("/api/user",sanityMiddleWare,(req,res)=>{
    try{
        //get new user
        let newUser = req.body;
        console.log(newUser);

        //Add "id" to newUser object
        let id = uuidv4();
        newUser.id = id;

        //add new user to db
        userDataDB.push(newUser);
        fs.writeFileSync("./dev-data.json",JSON.stringify(userDataDB));
    
        //respond with success
        res.status(200).json({message:"User added successfully"});
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

app.delete("/api/user/:id",(req,res)=>{
    try{
        //storing params passed by request into the variables. In this case "id" is the only param passed.
        const {id} = req.params;

        //search the db for id passed in request
        //findIndex is an HOF of array used in finding index of first occurance satisfying given condition
        let idx = userDataDB.findIndex(userObj=>userObj.id == id);

        //Delete if user found and respond with error if user not found
        if(idx == -1){
            res.status(400).json({
                message:"user not found"
            })
        }
        else{
            //delete the user
            userDataDB.splice(idx,1);
            fs.writeFileSync("./dev-data.json",JSON.stringify(userDataDB));
            //respond with success message
            res.status(200).json({
                message : "User deleted successfully"
            })
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get("/api/user/:id",(req,res)=>{
    try{
        //storing params passed by request into the variables. In this case "id" is the only param passed.
        const {id} = req.params;

        //search the db for id passed in request
        //findIndex is an HOF of array used in finding index of first occurance satisfying given condition
        let idx = userDataDB.findIndex(userObj=>userObj.id == id);

        //Delete if user found and respond with error if user not found
        console.log(id,idx);
        if(idx == -1){
            res.status(400).json({
                message:"user not found"
            })
        }
        else{
            res.status(200).json({
                message:" User data fetched",
                data:userDataDB[idx]
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
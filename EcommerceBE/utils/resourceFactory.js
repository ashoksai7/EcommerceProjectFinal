const {userModel} = require("../models/userModel");
const {productModel} = require("../models/productModel");
const { models } = require("mongoose");

const addResource = function(modelName){
    console.log(modelName,"creating add method");
    return async (req,res)=>{
        try{
            //get new user
            let newData = req.body;
            console.log(newData);
    
            //const user = await userModel.create(newUser);
            //Hence the above line with create method will not help in invoking the pre hook we are using save method below
            
            const resourceData = new modelName(newData);
            const resourceAdded = await resourceData.save();
        
            //respond with success
            res.status(200).json({message:"Resource added successfully",resourceAdded});
        }
        catch(err){
            res.status(500).json({
                message: err.message
            })
        }
    }
}

const getAllResource = function(modelName){
    console.log(modelName,"creating getAll method");
    return async (req,res)=>{
        try{
            //console.log("Sending users details");
            const allResourceData = await modelName.find({});
            res.status(200).json({
                message: "Resource list",
                data: allResourceData
            });
        }
        catch(err){
            res.status(500).json({
                message:err.message,
            });
        }

    }
}

const getResourceById = function(modelName){
    console.log(modelName,"creating getResoureById method");
    return async (req,res)=>{
        try{
            //storing params passed by request into the variables. In this case "id" is the only param passed.
            const {id} = req.params;
    
            //Using findOne method available in useerModel to fetch the detail of one document with specified value
            //let currUserData = await userModel.findOne({ _id: id });
            let currResourceData = await modelName.findById(id);
    
            
            console.log(currResourceData);
            if(!currResourceData){
                res.status(400).json({
                    message:"resource not found"
                })
            }
            else{
                res.status(200).json({
                    message:" Resource fetched",
                    data:currResourceData
                })
            }
        }
        catch(err){
            res.status(500).json({message:err.message});
        }
    }
}

const getResourceByName  = function(modelName){
    console.log(modelName,"creating getResoureByName method");
    return async (req,res)=>{
        try{
            //storing params passed by request into the variables. In this case "id" is the only param passed.
            const {name} = req.params;
    
            //Using findOne method available in useerModel to fetch the detail of one document with specified value
            let currResourceData = await modelName.find({ name: name });
            //let currUserData = await userModel.findById(id);
    
            
            console.log(currResourceData);
            if(currResourceData.length==0){
                res.status(400).json({
                    message:"Resource not found"
                })
            }
            else{
                res.status(200).json({
                    message:" Resource fetched",
                    data:currResourceData
                })
            }
        }
        catch(err){
            res.status(500).json({message:err.message});
        }
    }
}

const updateResource = function(modelName){
    console.log(modelName,"Creating update resource method");
    return async (req,res)=>{
        try{
            const {id} = req.params;
            let requiredUpdate = req.body;
            const updatedResource = await modelName.findByIdAndUpdate(id,requiredUpdate,{returnDocument:'after'});
            if(updatedResource){
                res.status(200).json({
                    message:"User updated successfully",
                    updatedResource
                })
            }
        }
        catch(err){
            res.status(500).json({
                message:err.message
            })
        }
    }
}

const deleteResource = function(modelName){
    console.log(modelName,"Creating delete resource method");
    return async (req,res)=>{
        try{
            //storing params passed by request into the variables. In this case "id" is the only param passed.
            const {id} = req.params;
    
            //const userToDelete = await userModel.findByIdAndDelete(id);
            const resourceToDelete = await modelName.findOneAndDelete({_id:id});
            //findByIdAndDelete internally calls findOneAndDelete
    
            //Delete if user found and respond with error if user not found
    
            //console.log(userToDelete);
            if(resourceToDelete){
                res.status(200).json({
                    message:"resource deleted successfully"
                })
            }
            else{
                res.status(400).json({
                    message: "Please provide a valid resource id"
                })
            }
            
        }
        catch(err){
            res.status(500).json({message:err.message});
        }
    }
}

module.exports = {
    addResource,getAllResource,getResourceById,getResourceByName,updateResource,deleteResource
}


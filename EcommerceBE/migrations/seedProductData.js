// Migration Script:
// create update delete the set of entries from the db
// migration is completely independent of our Server
// seed the data
// update the data due to schema changes, security issue, performance issue
// delete data


//steps for a migration script
// Connect to the DB
// Identify the collection / model where you want to make the changes
// Get to the list of entries and Identify the query will be used and apply it
//         * updateMany
//         * deleteMany
//         * insertMany
// Close the connection

const {productModel} = require("../models/productModel");
const productList = require("../json/products");
//console.log(productList);
function seedProductData(model,entries){
    console.log(model);
    const mongoose = require("mongoose");
    const dotenv = require("dotenv");
    dotenv.config();
    const { USERID, MONGODBPASSWORD} = process.env;
    const dbUrl = `mongodb+srv://${USERID}:${MONGODBPASSWORD}@cluster0.uubiman.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.connect(dbUrl)
    .then(()=>{
        console.log("db connected");
        console.log("dropping existing model");
        return model.collection.drop();
        
    })
    .then(()=>{
        console.log("insert documents in db");
        return model.insertMany(entries);
    })
    .catch((err) => {
        console.log(err.message);
    })
    .finally(()=>{
        console.log("documents added");
        mongoose.disconnect();
        console.log("Connection closed");
    })
}

seedProductData(productModel,productList);
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:[4,"product name should have atleast 4 characters"]
    },
    price:{
        type:Number,
        required:true,
        min:[0,"price cannot be negative"]
    },
    discount:{
        type:Number,
        default:0,
        required:true,
        validate:[function(){
            return this.discount<this.price;
        },"discount cannot be greater the price"]
    },
    description:String,
    brand:String,
    category:{
        type:String,
        default:"Miscelleneous",
        retuired:true
    },
    image:{
        type:String,
    }
},{timestamps:true})



const productModel = mongoose.model('productModel',productSchema);

module.exports={
    productModel
}
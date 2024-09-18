const mongoose = require("mongoose");

let bookingSchemaObject = {
    bookedAt:{
        type: Date,
        default: Date.now()
    },
    price:{
        type: Number,
        required: true
    },
    payment_order_id:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"userModel"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"productModel"
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","success","failure"]
    },
    quantity:{
        type:Number,
        default:1
    }
}

const bookingSchema = new mongoose.Schema(bookingSchemaObject);

const bookingModel = mongoose.model("bookingModel",bookingSchema);

module.exports = bookingModel;
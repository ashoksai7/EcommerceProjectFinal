const mongoose = require("mongoose");

let reviewSchemaObject = {
    rating:{
        type: Number,
        required:true,
        min:[1,"rating cannot be less than 1"],
        max:[5,"rating cannot be more than 5"]
    },
    review_title:{
        type: String,
        required: true
    },
    review_desc:{
        type: String,
        required: true
    },
    booking:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"bookingModel"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"userModel"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"productModel"
    }
}

const reviewSchema = new mongoose.Schema(reviewSchemaObject);

const reviewModel = mongoose.model("reviewModel",reviewSchema);

module.exports = reviewModel;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true          
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.password==this.confirmPassword;
        }
    }
  });


  //Creating Model with the above created Schema
  //Below line will create a model named "userModel" in the mongo db
  const userModel = mongoose.model('userModel', userSchema);

  module.exports = {
      userModel,
  };



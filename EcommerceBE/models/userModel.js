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
        minLength: 8,
        validate: function(){
            return this.password==this.confirmPassword;
        }
    },
    // createdAt:{
    //     type: Date,
    //     default: Date.now()
    // },
    /*
    Insted of using createdAt key we can use timestamps
    feature provided by mongoose/mongodb to store createdAt
    and updatedAt params
    */
    role:{
        type:String,
        default:"user"
    },
    bookings:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"bookingModel"
    }
  },{timestamps:true});



  //Creating Model with the above created Schema
  //Below line will create a model named "userModel" in the mongo db
  

  /*
    pre hook is a middleware that we are using to skip storing
    confirmPassword as a new value in the DB.

    pre hook only works with save,validate and other options
    but not with create option
  */
  userSchema.pre("save",function(next){
      this.confirmPassword = undefined;
      next();
  })

  /*
  Using below prehok to check whether the given role
  is one among the valid roles
  */

  const roles = ["admin","buyer","seller"];

  userSchema.pre("save",function(next){
    let rolePresent = roles.find(role=>role==this.role);
    if(!rolePresent){
        const err = new Error("Role is invalid");
        next(err);
    }
    next();
  })

  /*
  Below pre hook is to de-select the passowrd field while
  finding the data of one person because this could be a
  sec=urity concern if anyone using API can fetch the password
  */
//   userSchema.pre("findOne",function(next){
//       this.select("-password");
//       next();
//   })

  /*
  Below pre hook is to illustrate that findOneAndDelete is
  invoked internally when findByIdAndDelete is called
  */
  userSchema.pre("findOneAndDelete",function(next){
      console.log("I was called before deleting a user");
      next();
  })

  //Post hooks are implemented after the query is run. Below is a sample
  userSchema.post("save",function(error,doc,next){
    console.log("post hook is called");
    next();
  })


  const userModel = mongoose.model('userModel', userSchema);

  module.exports = {
      userModel,
  };



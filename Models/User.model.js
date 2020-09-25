const mongoose = require('mongoose');

const schema = mongoose.Schema;



var UserSchema = new schema({
    username:{
      type:String,
      index:true,
      required:true
    },
    password: {
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    phoneNumber:{
      type:Number,
      required:true
    }
  });


const User = mongoose.model('User',UserSchema);

module.exports = User;





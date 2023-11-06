const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
   firstName:{
    type:String,
    requried:true,
    trim:true
   },

   lastName:{
    type:String,
    requried:true,
    trim:true
   },

   username:{
    type:String,
    requried:true,
    trim:true,
    unique:true
   },

   email:{
    type:String,
    requried:true,
    trim:true,
    unique:true
   }, 

   password:{
    type:String,
    requried:true,
   },

   profilePic:{
    type:String,
    default:"/images/profilePic.png"
   }

},{
   timestamps:true
})

const User = mongoose.model('User', userSchema);
module.exports=User;
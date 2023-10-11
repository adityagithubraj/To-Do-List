const mongoose = require("mongoose");
require("dotenv").config();

const schema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
 
})


const User=mongoose.model("user",schema);



module.exports={User}
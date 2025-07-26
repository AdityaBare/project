const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        required:true,
        type:String
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("User",userSchema);
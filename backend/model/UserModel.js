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
    },
    token:{String},
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Listing'}

    ]
    
})

module.exports=mongoose.model("User",userSchema);
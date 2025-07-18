const mongoose = require('mongoose');;

const reviewSchema = new mongoose.Schema({
    star:{
        type:Number,
    },
    review:String,
   
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
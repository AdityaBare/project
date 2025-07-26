const mongoose = require("mongoose");

const list = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        url:String,
        filename:String
    },
    description:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'}

    ],
    price:Number,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


})

module.exports=mongoose.model("Listing",list)
const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const  cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoute = require('./router/user')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());



app.use('/user',userRoute);


app.listen(8080,()=>{
    mongoose.connect(process.env.Mongooose_URL);
    console.log("listening on port 8080");
})
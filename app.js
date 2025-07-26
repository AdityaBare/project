const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./router/user')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',userRoute);


app.listen(8080,()=>{
    mongoose.connect(process.env.Mongooose_URL);
    console.log("listening on port 8080");
})
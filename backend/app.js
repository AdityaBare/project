const express = require('express');

require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./router/user')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log('>>> Middleware Check:');
//   console.log('Headers:', req.headers['content-type']);
//   console.log('Body:', req.body); // Should NOT be undefined
//   next();
// });

app.use('/',userRoute);


app.listen(8080,()=>{
    mongoose.connect(process.env.Mongooose_URL);
    console.log("listening on port 8080");
})
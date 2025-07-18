const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');





app.listen(8080,()=>{
    // mongoose.connect(process.env.Mongooose_URL);
    console.log("listening on port 8080");
})
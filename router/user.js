
const express = require('express');
const router = express.Router();

const { signUp }= require('../middleware/authentication');

router.route('/signup').post(signUp);

module.exports =router;
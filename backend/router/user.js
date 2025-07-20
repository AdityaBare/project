
const express = require('express');
const router = express.Router();

const { signUp ,login,logout}= require('../middleware/authentication');

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports =router;
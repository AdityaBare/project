const express = require('express');
const router = express.Router();
const {addToCart,removeFromCart,showCart} = require("../middleware/cart.js");

router.route('/:id/add').post(addToCart);
router.route('/:id/remove').post(removeFromCart);
router.route('/').get(showCart);




module.exports = router;
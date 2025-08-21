const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');

function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.redirect('/login');
}
 
router.post('/products/:productId/reviews', isLoggedIn, async (req, res) => {
    const { rating, comment } = req.body;
    const { productId } = req.params;
       
    try {
        const review = new Review({
            product: productId,
            user: req.session.userId,
            rating,
            comment
        });

        await review.save();
        res.redirect(`/products/${productId}`);
    } catch (err) {
        res.status(400).send("Error saving review: " + err.message);
    }
});

module.exports=router;
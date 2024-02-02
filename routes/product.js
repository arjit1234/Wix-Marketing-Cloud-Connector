const express = require('express');
const getProduct = require('../middleware/API');
const Product = require('../models/product')
const router = express.Router();

// Define route for /products
router.get('/products', async(req, res) => {
    // getProduct().then((result) => {
    //     const product = new Product({
    //         productId: result.product.Id,
    //         productName: result.product.name,
    //         SKU: result.product.name,
    //         price: result.product.price.price
    //     });
    //     product.save().catch((error) => {
    //         // Handle save errors here
    //         console.error('Error saving product:', error);
    //     });
    //     return res.status(200).json(result);
    // }).catch((error) => {
    //     // Handle errors here
    //     return res.status(500).json({ error: error.message });
    // });
    try {
        const products = await Product.find({});

        // Log products (for debugging)
    
        // Render products
        res.render('products', { products });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

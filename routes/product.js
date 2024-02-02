const express = require('express');
const getProduct = require('../middleware/API');
const Product = require('../models/product')
const router = express.Router();
const syncRouter = express.Router();
// Define route for /products
router.get('', async(req, res) => {

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
// Define Route for Sync Product
syncRouter.get('', async(req,res) =>{   
        
        getProduct().then((result) => {
        const product = new Product({
            productId: result.product.Id,
            productName: result.product.name,
            SKU: result.product.sku,
            price: result.product.price.price
        });
        product.save().catch((error) => {
            // Handle save errors here
            console.error('Error saving product:', error);
        });
        
        res.render('products', { products })
    }).catch((error) => {
        // Handle errors here
        return res.status(500).json({ error: error.message });
    });
})

module.exports ={
    router : router,
    syncRouter: syncRouter, 
} 

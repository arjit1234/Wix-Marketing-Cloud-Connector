const express = require('express');
const { getProduct } = require('../middleware/API');
const Product = require('../models/product')
const flash = require('express-flash');
const session = require('express-session');
const crypto = require('crypto');
const router = express.Router();
const syncRouter = express.Router();
const secretKey = crypto.randomBytes(32).toString('hex');


syncRouter.use(session({
    secret: 'ABCD',
    resave: false,
    saveUninitialized: true
}));
syncRouter.use(flash());
router.use(session({
    secret: 'ABCDFR',
    resave: false,
    saveUninitialized: true
}));
router.use(flash());
// Define route for /products
router.get('', async(req, res) => {

    try {
        const products = await Product.find({});

        // Log products (for debugging)
    
        // Render products
        console.log(req.flash());
        console.log(req.session);
        res.render('products/products', { products, messages: req.flash() });
    } catch (err) {
        // Handle errors
        res.status(500).json({ error: err.message });
    }
});

// Define Route for Sync Product
syncRouter.get('', async (req, res) => {
    
    try{
            const productResults = await getProduct();

            //Ensure productResults array is not empty;
            if (!productResults || productResults.length === 0) {
                req.flash('error', 'No products found');
                return res.redirect('/product');
            }

            productResults.forEach( async (productData) => {
                //Ensure productId has 

                const product = new Product({
                    productId: productData.id,
                    productName: productData.name,
                    SKU: productData.sku,
                    price: productData.price,
                });

                try {
                    await product.save();
                    req.flash('success','Product saved Successfully');
                } catch (error) {
                    if (error.code === 11000) {
                        req.flash('error', 'Duplicate Product Id Not allowed');

                    } else {
                        req.flash('error', 'Failed to save product')
                    }
                    // return res.redirect('/product');
                }

            });
            return res.redirect('/product');
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports ={
    router : router,
    syncRouter: syncRouter, 
} 

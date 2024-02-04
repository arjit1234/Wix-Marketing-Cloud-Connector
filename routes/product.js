const express = require('express');
const { getProduct } = require('../middleware/API');
const Product = require('../models/product')
// const flash = require('express-flash');
// const session = require('express-session');
// const crypto = require('crypto');
// const { Console } = require('console');
const router = express.Router();
const syncRouter = express.Router();
// const secretKey = crypto.randomBytes(32).toString('hex');


// syncRouter.use(session({
//     secret: 'ABCD',
//     resave: false,
//     saveUninitialized: true
// }));
// syncRouter.use(flash());
// router.use(session({
//     secret: 'ABCDFR',
//     resave: false,
//     saveUninitialized: true
// }));
// router.use(flash());
// Define route for /products
router.get('', async(req, res) => {
    try {
        const products = await Product.find({});

        // Log products (for debugging)
        // Render products
        res.render('products/products', { products });
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
                return res.redirect('/product');
            }

            productResults.forEach( async (productData) => {
                //Ensure productId has 
                const  existingProduct = await Product.findOne({ productId: productData.id });
                if (existingProduct) {
                    //update product 

                    existingProduct.productName = productData.name;
                    existingProduct.SKU = productData.sku;
                    existingProduct.price = productData.price.discountedPrice;
                    
                    try {
                        await existingProduct.save();
                        console.log(`Product with productId ${productData.id} is updated`);
                    } catch (error) {
                        console.log(`Product with productId ${productData.id} is not updated ${error.message}`);
                    }

                } else {
                    //Create new product
                    const product = new Product({
                        productId: productData.id,
                        productName: productData.name,
                        SKU: productData.sku,
                        price: productData.price.discountedPrice
                    });

                    try {
                        await product.save();
                        // console.log(`Product with productId ${$productData.id} is created`);
                    } catch (error) {
                        console.log(`Product with productId ${productData.id} is not updated ${error.message}`)
                    }
                }

            });
            return res.redirect('/product');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports ={
    router : router,
    syncRouter: syncRouter, 
} 

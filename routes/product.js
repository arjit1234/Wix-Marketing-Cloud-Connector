const express = require('express');
const { getProduct,update } = require('../middleware/API');
const Product = require('../models/product');
// const flash = require('express-flash');
// const session = require('express-session');
// const crypto = require('crypto');
// const { Console } = require('console');
const router = express.Router();
const syncRouter = express.Router();
const updateProduct = express.Router();


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
                    images: productData.media.image ? productData.media.mainMedia.image.url: '';
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
                        price: productData.price.discountedPrice,
                        images: productData.media.image ? productData.media.mainMedia.image.url: '',
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
updateProduct.get('/:id', async (req,res) =>{
    try { 
            
            const prodId= req.params.id;
            const product_data = {
                id: req.params.id,
                name : req.query.productName,
                price: req.query.productPrice,
                sku: req.query.productSKU,
            };

            const update_response = await update(prodId,product_data);

            const productData = await Product.findOne({ productId : prodId });
        
            return res.render('products/update', {productData});
    } catch (error) {
        console.log(error)
    }
})


module.exports ={
    router : router,
    syncRouter: syncRouter, 
    updateProduct: updateProduct
} 

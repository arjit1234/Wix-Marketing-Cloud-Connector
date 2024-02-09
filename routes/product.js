const express = require('express');
const { getProduct,update_platform_Product ,delete_platform_Product  } = require('../middleware/API');
const Product = require('../models/product');
// const flash = require('express-flash');
// const session = require('express-session');
// const crypto = require('crypto');
// const { Console } = require('console');
const router = express.Router();
const syncRouter = express.Router();
const updateProduct = express.Router();
const deleteProduct =  express.Router();

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
    try {
        const productResults = await getProduct();
        
        // Ensure productResults array is not empty;
        if (!productResults || productResults.length === 0) {
            return res.redirect('/product');
        }
        console.log(productResults);
        for (const productData of productResults) {
            try {
                // Find existing product by productId
                let existingProduct = await Product.findOne({ productId: productData.id });
    
                if (existingProduct) {
                    // Update existing product
                    existingProduct.productName = productData.name;
                    // existingProduct.SKU = productData.sku;
                    existingProduct.price = productData.price.discountedPrice;
                    existingProduct.images = productData.media && productData.media.mainMedia && productData.media.mainMedia.image ? productData.media.mainMedia.image.url : '';
    
                    await existingProduct.save();
                    console.log(`Product with productId ${productData.id} is updated`);
                } else {
                    // Create new product
                    const product = new Product({
                        productId: productData.id,
                        productName: productData.name,
                        SKU: productData.sku,
                        price: productData.price.discountedPrice,
                        images: productData.media && productData.media.mainMedia && productData.media.mainMedia.image ? productData.media.mainMedia.image.url : '',
                    });
    
                    await product.save();
                    console.log(`Product with productId ${productData.id} is created`);
                }
            } catch (error) {
                if (error.code === 11000 && error.keyPattern && error.keyPattern.SKU) {
                    console.log(`Duplicate SKU detected for productId ${productData.id}`);
                } else {
                    console.log(`Error processing product with productId ${productData.id}: ${error.message}`);
                }
            }
        }
        return res.redirect('/product');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});
updateProduct.get('/:id', async (req,res) =>{
    try { 
            
            const prodId= req.params.id;
            const product_data ={ "product" : {
                        "name" : req.query.productName,
                        "productType": "physical",
                        "priceData": {
                         "price": req.query.productPrice
                       },
                       "description": "nice summer t-shirt",
                        "sku": req.query.productSKU,
                    }
                }

            const update_response = await update_platform_Product(prodId,product_data);
            console.log(update_response);
            const productData = await Product.findOne({ productId : prodId });

            if (productData) {
                productData.productName = update_response.product ?  update_response.product.name : null;
                productData.SKU = update_response.product ? update_response.product.sku : null;
                productData.price = update_response.product ? update_response.product.price.discountedPrice : null;

                try {
                     await productData.save()
                     console.log(`Product with productId ${productData.id} is updated`);
                } catch (error) {
                    console.log(`Product with productId ${productData.id} is not updated`);
                }
            }
        
            return res.render('products/update', {productData});
    } catch (error) {
        console.log(error)
    }
})

deleteProduct.get('/:id',  async (req,res) => {
    try {
        let id = req.params.id;

        const delete_response  = await delete_platform_Product(id);
        
        if(delete_response) {
            try {
                const deletedProduct = await Product.findOneAndDelete({ productId : id });
                if (!deletedProduct) {
                    return res.status(404).json({ message: 'Product not found' });
                }
            }  catch (error) {
                res.status(500).json({})
            }          
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.redirect('/product');
})

module.exports ={
    router : router,
    syncRouter: syncRouter, 
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
} 

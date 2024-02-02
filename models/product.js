const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type: String,
        required: false,
        unique: true,
    },
    productName:{
        type: String,
        required: false,
    },
    SKU:{
        type: String,
        required: false,
        unique: true,
    },
    price:{
        type: Number,
        required: false,
    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product
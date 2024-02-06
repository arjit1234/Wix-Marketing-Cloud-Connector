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
        unique: false,
    },
    price:{
        type: Number,
        required: false,
    },
    images:{
      type: String,
      required: false,  
    }
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports = Product
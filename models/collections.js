const mongoose = require('mongoose');


const collectionSchema = new mongoose.Schema({
    collectionId:{
        type: String,
        require: true,
        unique: true
    },
    collectionName:{
        type: String,
        require: true,
        unique: false,
    },
}, { timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection
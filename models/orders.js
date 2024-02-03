const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
      orderId:{
        type: String,
        required: true,
        unique: true
      },
      date: {
        type: String,
        required: false,
      },
      customer: {
        type: String,
        required: false,
        unique: false,
      },
      payment_status: {
        type: String,
        required: false,
        unique: false
      },
      fulfillment: {
        type: String,
        required: false,
        unique: false,
      }
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order
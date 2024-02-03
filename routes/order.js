const express = require('express');
const Order = require('../models/orders');
const { getOrder } = require('../middleware/API');
const order = express.Router();
const syncorderRouter = express.Router();


//Define route for display order
order.get('', async(req, res) =>{
    try {
        const orders  = await Order.find({});
        res.render('orders/order', {orders});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//Define route for display order
syncorderRouter.get('', async (req, res) => {
    try {
        const orderResult = await getOrder();
        if(!orderResult || orderResult.length === 0) {
            res.status(400).json({ error: error.message })
        }

        orderResult.orders.forEach( async (orderData) => {
            const order = new Order({
                orderId: orderData.number,
                date: orderData.dateCreated,
                customer: orderData.buyerInfo.firstName,
                payment_status: orderData.paymentStatus,
                fulfillment: orderData.fulfillmentStatus,

            })

            try {
                await order.save();
            } catch(error) {
                if (error.code === 11000) {
                    console.log('error', 'Duplicate Order Is Not allowed');
                } else {
                    consol.log('error', 'Failed to save product');
                }
            }

        })
        res.redirect('/order')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    syncorderRouter: syncorderRouter,
    order: order
}
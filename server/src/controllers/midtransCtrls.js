const midtransClient = require('midtrans-client');
const { v4 } = require("uuid");
const Order = require('../models/orderModels');
const asyncHandler = require('express-async-handler');
const axios = require('axios')
const Order2 = require("../models/order2Models");

const createMidtrans = asyncHandler(async (req, res, next) => {
    try {
        const { _id } = req.user;
        const order = await Order.findOne({ user: _id }).populate({ path: 'user', select: 'email', select: ['email', 'username'] });
        let totalPrice = 0
        let totalShippment = 0
        for (let index = 0; index < order?.products?.length; index++) {
            totalPrice += Number(order.products[index].price);
            totalShippment += Number(order.products[index].shippmentCost);
            if (!order.products[index].shippment) {
                throw new Error("choose the shippment")
            } else if (!order.products[index].shippmentCost) {
                throw new Error("choose the shippment cost")
            }
        }
        let grandTotal = totalPrice + totalShippment
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_ID
        });

        let parameter = {
            "transaction_details": {
                "order_id": v4(),
                "gross_amount": grandTotal
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": order.user.username,
                "last_name": "",
                "email": order.user.email,
                "phone": ""
            }
        };

        snap.createTransaction(parameter)
            .then((transaction) => {
                let transactionToken = transaction.token;
                // console.log('transactionToken:', transactionToken);
                res.json(transactionToken)
            })
    } catch (error) {
        next(error);
    }
});
const getStatusOrder = asyncHandler(async (req, res, next) => {
    try {
        const config = {
            auth: {
                username: process.env.MIDTRANS_SERVER_KEY,
                password: "",
            },
        };
        const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${req.params.id}/status`, config)
        if (response.data.transaction_status === 'settlement') {
            await Order2.updateMany(
                { "orderId": response.data.order_id },
                {
                    "$set":
                    {
                        "orderStatus": "Being Packaged",
                        "payInfo": response.data
                    }
                });
        }
        return res.status(201).json(response.data)
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createMidtrans, getStatusOrder
}
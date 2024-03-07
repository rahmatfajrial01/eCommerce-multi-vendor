const mongoose = require('mongoose');

const order2Schema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        shope: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shope"
        },
        shopeName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        shippment: {
            type: String,
            required: true,
        },
        shippmentCost: {
            type: Number,
            required: true,
        },
        shippmentService: {
            type: String,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        address: {
            type: Array,
            required: true,
        },
        orderStatus: {
            type: String,
            default: "Being Packaged"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order2', order2Schema);
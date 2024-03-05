const mongoose = require('mongoose');

const order2Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        shope: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shope"
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
        products: {
            type: Array,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order2', order2Schema);
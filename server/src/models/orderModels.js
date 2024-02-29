const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cart: {
        type: Array,
        required: true,
    },
    // totalPrice: {
    //     type: Number,
    //     required: true,
    // },
    // shope: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Shope"
    // },
    // shippingAddress: {
    //     type: Object,
    //     required: true,
    // },
    status: {
        type: String,
        default: "Processing",
    },
    // paymentInfo: {
    //     id: {
    //         type: String,
    //     },
    //     status: {
    //         type: String,
    //     },
    //     type: {
    //         type: String,
    //     },
    // },
    // paidAt: {
    //     type: Date,
    //     default: Date.now(),
    // },
    // deliveredAt: {
    //     type: Date,
    // },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", orderSchema);
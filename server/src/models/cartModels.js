const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        shope: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shope"
        },
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
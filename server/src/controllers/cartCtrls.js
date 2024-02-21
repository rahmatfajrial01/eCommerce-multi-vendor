const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModels');

const addCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { product, quantity, price } = req.body;
        let newCart = await new Cart({
            user: _id,
            product,
            price,
            quantity,
        }).save()
        res.json(newCart)
    } catch (error) {
        throw new Error(error);
    }
})

const getCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const cart = await Cart.find({ user: _id })
            .populate("product")
        res.json(cart)
    } catch (error) {
        throw new Error(error);
    }
})
const deleteCart = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByIdAndDelete(id)
        res.json(cart)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    addCart,
    getCart,
    deleteCart
}




const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/ShopeModels");
const Order = require("../models/orderModels");
const Cart = require("../models/cartModels")

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if (user) {
            let userCart = await Cart.find({ user: user._id });
            let newOrder = await new Order({
                user: user._id,
                cart: userCart
            }).save();
            // console.log('tests')

            res.json(newOrder);
        } else {
            throw new Error("User Not Found");
        }
    } catch (error) {
        throw new Error(error);

    }
});

module.exports = {
    createOrder
}

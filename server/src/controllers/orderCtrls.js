const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/ShopeModels");
const Order = require("../models/orderModels");
const Cart = require("../models/cartModels")

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { shope, shopeName, price, products } = req.body
        const { _id } = req.user;
        let userOrder = await Order.find({ user: _id });
        if (userOrder) {
            userOrder = await Order.deleteMany()
            let newOrder = await new Order({
                user: _id,
                products,
            }).save();
            res.json(newOrder);
        } else {
            let newOrder = await new Order({
                user: _id,
                shope,
                shopeName,
                price,
                products,
            }).save();
            res.json(newOrder);
        }
    } catch (error) {
        throw new Error(error);

    }
});

const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const allBrand = await Order.find({ user: _id })
        return res.json(allBrand);
    } catch (error) {
        next(error);
    }
});

const updateShippment = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { idShope, shippment } = req.body
    try {
        // let allBrand = await Order.findOne({ user: _id, })
        let allBrand = await Order.updateOne(
            {
                "user": _id, "products.shope": idShope
            },
            {
                $set: {
                    "products.$.shippment": shippment
                }
            }
        )

        return res.json(allBrand);
    } catch (error) {
        next(error);
    }
});

const updateShippmentCost = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { idShope, cost } = req.body
    try {
        // let allBrand = await Order.findOne({ user: _id, })
        let allBrand = await Order.updateOne(
            {
                "user": _id, "products.shope": idShope
            },
            {
                $set: {
                    "products.$.shippmentCost": cost
                }
            }
        )

        return res.json(allBrand);
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createOrder, getOrder, updateShippment, updateShippmentCost
}
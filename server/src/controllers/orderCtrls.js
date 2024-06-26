const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/shopeModels");
const Order = require("../models/orderModels");
const Cart = require("../models/cartModels");
const Order2 = require('../models/order2Models');
const Product = require("../models/productModels");

const { v4 } = require("uuid");

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { shope, shopeName, price, products, weight } = req.body
        const { _id } = req.user;
        let userOrder = await Order.find({ user: _id });
        if (userOrder) {
            await Order.findOneAndDelete({ user: _id })
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
                weight,
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
    const { idShope, cost, service } = req.body
    try {
        // let allBrand = await Order.findOne({ user: _id, })
        let allBrand = await Order.updateOne(
            {
                "user": _id, "products.shope": idShope
            },
            {
                $set: {
                    "products.$.shippmentCost": cost,
                    "products.$.shippmentService": service
                }
            }
        )

        return res.json(allBrand);
    } catch (error) {
        next(error);
    }
});

const getCost = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const order = await Order.findOne({ user: _id })
        let totalPrice = 0
        let totalShippment = 0
        for (let index = 0; index < order?.products?.length; index++) {
            totalPrice += Number(order.products[index].price);
            totalShippment += Number(order.products[index].shippmentCost);
        }
        let grandTotal = totalPrice + totalShippment
        return res.status(200).json({
            totalPrice, totalShippment, grandTotal
        });
    } catch (error) {
        next(error);
    }
});

const sendOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { dataAddress, result } = req.body
    try {
        let order = await Order.findOne({ user: _id })
        let cart = await Cart.find({ user: _id })
        let product = await Product.find()

        let data = {}
        let astaga
        let orderStatus
        // const orderId = v4()
        for (let i = 0; i < cart.length; i++) {
            for (let j = 0; j < product.length; j++) {
                if (cart[i].product.toString() === product[j]._id.toString()) {
                    await Product.findByIdAndUpdate(
                        cart[i].product,
                        {
                            sold: product[j].sold + cart[i].quantity,
                            quantity: product[j].quantity - cart[i].quantity
                        },
                        {
                            new: true
                        }
                    )
                }
            }
        }

        if (result.transaction_status === 'pending') {
            orderStatus = 'Unpaid'
        }
        for (let index = 0; index < order.products.length; index++) {
            data = {
                orderId: result.order_id,
                user: order.user,
                shope: order.products[index].shope,
                shopeName: order.products[index].shopeName,
                price: order.products[index].price,
                shippment: order.products[index].shippment,
                shippmentCost: order.products[index].shippmentCost,
                shippmentService: order.products[index].shippmentService,
                address: dataAddress,
                payInfo: result,
                orderStatus,
                products: order.products[index].products
            }
            astaga = await new Order2(data).save();
        }
        if (astaga) {
            await Cart.deleteMany({ user: _id })
            await Order.findOneAndDelete({ user: _id })
        }
        return res.json({
            message: "order created"
        });
    } catch (error) {
        next(error);
    }
});

const clearCost = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    try {
        let tes = await Order.updateOne(
            {
                "user": _id, "products.shope": req.body.idShope
            },
            {
                $set: {
                    "products.$.shippmentCost": "",
                }
            }
        )
        res.json(tes)
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createOrder, getOrder, updateShippment, updateShippmentCost, getCost, sendOrder, clearCost
}

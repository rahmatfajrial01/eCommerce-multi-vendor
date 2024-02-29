const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModels');

const addCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { product, quantity, price, shope } = req.body;
        const cartAndUser = await Cart.findOne({
            $and: [{
                user: {
                    $eq: _id
                }
            },
            {
                shope: {
                    $eq: shope
                }
            }
            ]
        })
        if (cartAndUser) {
            cartAndUser.cart.push({
                product,
                price,
                quantity,
            });
            await cartAndUser.save();
            res.json(cartAndUser)
        } else {
            let newCart = await new Cart({
                user: _id,
                shope,
                cart: {
                    product,
                    price,
                    quantity,
                }
            }).save()
            res.json(newCart)
        }
        // let newCart = await new Cart({
        //     user: _id,
        //     product,
        //     price,
        //     quantity,
        // }).save()
        // res.json(newCart)
    } catch (error) {
        throw new Error(error);
    }
})

const getCart = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const cart = await Cart.find({ user: _id })
            .populate("shope")
            .populate({
                path: 'cart',
                populate: {
                    path: 'product'
                }
            })
        res.json(cart)
    } catch (error) {
        throw new Error(error);
    }
})
const deleteCart = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { idShope } = req.params;
        const { _id } = req.user;
        const cartAndUser = await Cart.findOne({
            $and: [{
                user: {
                    $eq: _id
                }
            },
            {
                shope: {
                    $eq: idShope
                }
            }
            ]
        })
        if (cartAndUser.cart.length == 1) {
            await Cart.findByIdAndDelete({ _id: cartAndUser._id })
        } else {
            await cartAndUser.updateOne(
                { $pull: { cart: { _id: id } } }
            );
        }
        res.json(cartAndUser)
    } catch (error) {
        throw new Error(error);
    }
})

const changeQtyCart = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByIdAndUpdate(
            id,
            { quantity: req.body.quantity }
            ,
            {
                new: true
            }
        )
        res.json(cart)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    addCart,
    getCart,
    deleteCart,
    changeQtyCart
}




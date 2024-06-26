const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModels');
const Product = require('../models/productModels');
const { mongo: { ObjectId } } = require('mongoose')

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
                product: {
                    $eq: product
                }
            }
            ]
        })
        if (cartAndUser) {
            const pStock = await Product.findOne({ _id: product })
            if (Number(cartAndUser.quantity) + Number(quantity) > pStock.quantity) {
                throw (`this product out of stock in your cart`);
            } else {
                const add = await Cart.updateOne(
                    {
                        "user": _id, "product": product
                    },
                    {
                        $set: {
                            "quantity": Number(cartAndUser.quantity) + Number(quantity),
                        }
                    }
                )
                res.json(add)
            }
        } else {
            let newCart = await new Cart({
                user: _id,
                product,
                shope,
                price,
                quantity,
            }).save()
            res.json(newCart)
        }
    } catch (error) {
        throw new Error(error);
    }
})

const getCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const card_products = await Cart.aggregate([{
            $match: {
                user: {
                    $eq: new ObjectId(_id)
                }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: "_id",
                as: 'products'
            }
        }
        ])

        let buy_product_item = 0
        let calculatePrice = 0;
        let card_product_count = 0;
        let calculateWeight = 0;

        const outOfStockProduct = card_products.filter(p => p.products[0].quantity < p.quantity)
        for (let i = 0; i < outOfStockProduct.length; i++) {
            card_product_count = card_product_count + outOfStockProduct[i].quantity
        }

        const inStockProduct = card_products.filter(p => p.products[0].quantity >= p.quantity)
        for (let i = 0; i < inStockProduct.length; i++) {
            const {
                quantity
            } = inStockProduct[i]
            card_product_count = card_product_count + quantity
            buy_product_item = buy_product_item + quantity
            const {
                price,
                weight
            } = inStockProduct[i].products[0]

            calculatePrice = calculatePrice + quantity * price
            calculateWeight = calculateWeight + quantity * weight

        }
        let p = []
        let unique = [...new Set(inStockProduct.map(p => p.products[0].shope.toString()))]
        for (let i = 0; i < unique.length; i++) {
            let price = 0;
            let weight = 0;
            for (let j = 0; j < inStockProduct.length; j++) {
                const tempProduct = inStockProduct[j].products[0]
                if (unique[i] === tempProduct.shope.toString()) {

                    pri = tempProduct.price
                    we = tempProduct.weight
                    price = price + pri * inStockProduct[j].quantity
                    weight = weight + we * inStockProduct[j].quantity
                    p[i] = {
                        shope: unique[i],
                        shopeName: tempProduct.shopeName,
                        price,
                        shippment: "",
                        shippmentCost: "",
                        shippmentService: "",
                        weight,
                        products: p[i] ? [
                            ...p[i].products,
                            {
                                _id: inStockProduct[j]._id,
                                productInfo: tempProduct,
                                quantity: inStockProduct[j].quantity,
                            }
                        ] :
                            [{
                                _id: inStockProduct[j]._id,
                                productInfo: tempProduct,
                                quantity: inStockProduct[j].quantity,

                            }]
                    }
                }
            }
        }
        res.json({
            inStockProduct: p,
            price: calculatePrice,
            card_product_count,
            weight: calculateWeight,
            outOfStockProduct,
            buy_product_item
        })
    } catch (error) {
        console.log(error)
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




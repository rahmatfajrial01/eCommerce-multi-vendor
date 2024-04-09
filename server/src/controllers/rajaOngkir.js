const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/shopeModels");
const axios = require('axios');
const Order = require('../models/orderModels');

const getAllProvince = asyncHandler(async (req, res) => {
    try {
        const config = {
            headers: {
                key: `${process.env.RAJA_ONGKIR_API_KEY}`,
                "content-type": "application/x-www-form-urlencoded"
            },
        };
        const response = await axios.get(`https://api.rajaongkir.com/starter/province`, config)
        return res.status(201).json(response.data)

    } catch (error) {
        throw new Error(error)
    }
});

const getCity = asyncHandler(async (req, res) => {
    try {
        const config = {
            headers: {
                key: `${process.env.RAJA_ONGKIR_API_KEY}`,
                "content-type": "application/x-www-form-urlencoded"
            },
        };
        const response = await axios.get(`https://api.rajaongkir.com/starter/city?province=${req.params.id}`, config)
        return res.status(201).json(response.data)

    } catch (error) {
        throw new Error(error)
    }
});

const getCost = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        let shope = await Shope.findById(req.body.idShope);
        if (shope) {
            req.body.origin = shope.addresses[0].city_id
        }
        const config = {
            headers: {
                key: `${process.env.RAJA_ONGKIR_API_KEY}`,
                "content-type": "application/x-www-form-urlencoded"
            },
        };
        const response = await axios.post(`https://api.rajaongkir.com/starter/cost`, req.body, config)

        // update order shipments
        await Order.updateOne(
            {
                "user": _id, "products.shope": response.data.rajaongkir.query.idShope
            },
            {
                $set: {
                    "products.$.shippment": response.data.rajaongkir.query.courier,
                }
            }
        )
        return res.status(201).json(response.data)
    } catch (error) {
        throw new Error(error)
    }
});

module.exports = {
    getAllProvince, getCity, getCost
}

const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/ShopeModels");
const axios = require('axios')

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
        const config = {
            headers: {
                key: `${process.env.RAJA_ONGKIR_API_KEY}`,
                "content-type": "application/x-www-form-urlencoded"
            },
        };
        const response = await axios.post(`https://api.rajaongkir.com/starter/cost`, req.body, config)
        return res.status(201).json(response.data)

    } catch (error) {
        throw new Error(error)
    }
});

module.exports = {
    getAllProvince, getCity, getCost
}

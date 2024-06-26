const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/shopeModels");
const axios = require('axios')
const cloudinary = require('../utils/cloudinary');
const cartModels = require('../models/cartModels');
const mongoose = require("mongoose");

const register = asyncHandler(async (req, res) => {
    const { telephone, shopeName, address, codePos, user, province, city, fullAddress } = req.body;
    let checkUser = await User.findById(user);
    if (checkUser) {
        let shope = await Shope.findOne({ shopeName });
        if (shope) throw new Error("shope already axists")

        const config = {
            headers: {
                key: `${process.env.RAJA_ONGKIR_API_KEY}`,
                "content-type": "application/x-www-form-urlencoded"
            },
        };
        const response = await axios.get(`https://api.rajaongkir.com/starter/city?id=${city}province=${province}`, config)

        shope = await Shope.create({
            telephone,
            shopeName,
            // address,
            // codePos,
            addresses: {
                province: response.data.rajaongkir.results.province,
                city: response.data.rajaongkir.results.city_name,
                city_id: response.data.rajaongkir.results.city_id,
                fullAddress
            },
            user
        });
        await User.findByIdAndUpdate(user, { role: 2 });
        return res.status(201).json({
            shope,
            message: "shope created"
        });
    } else {
        throw new Error("user not axists")
    }
});

const currentShope = asyncHandler(async (req, res, next) => {
    try {
        const { _id } = req.user;
        let shope = await Shope.find({ user: _id }).populate([
            {
                path: "user",
                select: ["avatar", "username", "email"],
            }
        ]);
        if (shope) {
            return res.status(201).json({
                shope
            });
        } else {
            throw new Error("shope not axists")
        }
    } catch (error) {
        next(error);
    }
});

const updatePictureShope = async (req, res, next) => {
    try {
        // const result = await cloudinary.uploader.upload(req.file.path, {
        //     folder: "eCommerce/profile"
        // })
        await Shope.findByIdAndUpdate(
            req.params.id,
            {
                avatar: req.body.avatar
            },
            {
                new: true
            }
        );
        res.json({ message: 'profile shope updated' });
    } catch (error) {
        next(error);
    }
};

const updateInfoShope = async (req, res, next) => {
    try {
        let shope = await Shope.findById(req.params.id)
        if (shope) {
            await Shope.findByIdAndUpdate(
                req.params.id,
                {
                    shopeName: req.body.shopeName || shope.shopeName,
                    telephone: req.body.telephone || shope.telephone
                },
                {
                    new: true
                }
            );
            res.json({ message: 'shope info updated' });
        } else {
            throw new Error("shope not axists")
        }
    } catch (error) {
        next(error);
    }
};

const updateAddressShope = async (req, res, next) => {
    try {
        let shope = await Shope.findById(req.params.id)
        if (shope) {
            const { province, city, fullAddress } = req.body;
            const config = {
                headers: {
                    key: `${process.env.RAJA_ONGKIR_API_KEY}`,
                    "content-type": "application/x-www-form-urlencoded"
                },
            };
            const response = await axios.get(`https://api.rajaongkir.com/starter/city?id=${city || shope.city}province=${province || shope.province}`, config)

            await Shope.findByIdAndUpdate(
                req.params.id,
                {
                    addresses: {
                        province: response.data.rajaongkir.results.province || shope.province,
                        city: response.data.rajaongkir.results.city_name || shope.city_name,
                        city_id: response.data.rajaongkir.results.city_id || shope.city_id,
                        fullAddress: fullAddress || shope.fullAddress
                    },
                },
                {
                    new: true
                }
            );
            res.json({ message: 'shope info updated' });
        } else {
            throw new Error("shope not axists")
        }
    } catch (error) {
        next(error);
    }
};

const getMemberShope = asyncHandler(async (req, res, next) => {
    try {
        let shope = await Shope.findById(req.params.id).populate([
            {
                path: "user",
                select: ["avatar", "username", "email", "createdAt"],
            }
        ]);
        return res.status(201).json(shope)
    } catch (error) {
        next(error);
    }
});

const getNewMember = asyncHandler(async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(201).json({ message: 'user not found' })
        }
        else if (user.role >= 2) {
            return res.status(201).json({ message: 'user already be seller' })
        } else {
            return res.status(201).json({
                avatar: user.avatar,
                username: user.username,
                email: user.email,
                id: user._id,
            })
        }
    } catch (error) {
        next(error);
    }
});

const acceptMember = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error("user not axists")
        }
        else if (user.role >= 2) {
            throw new Error("user already be seller")
        } else {
            await User.findByIdAndUpdate(req.params.id, { role: 2 })
            let shope = await Shope.findByIdAndUpdate(
                req.params.shopeId,
                {
                    $push: { user: user._id },
                },
                {
                    new: true
                }
            )
            res.json(shope)
        }
    } catch (error) {
        next(error);
    }
});

const getAllShope = asyncHandler(async (req, res, next) => {
    try {
        const shope = await Shope.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: "shope",
                    as: 'products'
                }
            },

        ]);
        res.json(shope)
    } catch (error) {
        console.log(error)
        next(error);
    }
});

const getShope = asyncHandler(async (req, res, next) => {
    try {
        const shope = await Shope.aggregate([
            {
                $match: {
                    shopeName: req.params.shopeName
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: "shope",
                    as: 'products'
                }
            },

        ]);
        res.json(shope)
    } catch (error) {
        console.log(error)
        next(error);
    }
});

module.exports = {
    register, currentShope, updatePictureShope, updateInfoShope, updateAddressShope, getMemberShope, getNewMember, acceptMember, getAllShope, getShope
}

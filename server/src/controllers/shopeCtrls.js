const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/ShopeModels");

const register = asyncHandler(async (req, res) => {
    const { telephone, shopeName, address, codePos, user } = req.body;
    let checkUser = await User.findById(user);
    if (checkUser) {
        let shope = await Shope.findOne({ shopeName });
        if (shope) throw new Error("shope already axists")
        shope = await Shope.create({
            telephone,
            shopeName,
            address,
            codePos,
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


module.exports = {
    register, currentShope
}

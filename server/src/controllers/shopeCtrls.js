const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Shope = require("../models/ShopeModels");

const register = asyncHandler(async (req, res) => {
    const { telephone, shopeName, address, codePos, user } = req.body;
    let checkUser = await User.findById(user);
    if (checkUser) {
        let shope = await Shope.findOne({ shopeName });
        if (shope) return res.json({ message: "shope already axists" })
        shope = await Shope.create({
            telephone,
            shopeName,
            address,
            codePos,
            user
        });
        return res.status(201).json({
            shope,
            message: "shope created"
        });
    } else {
        throw new Error("user not axists")
    }
});

module.exports = {
    register
}

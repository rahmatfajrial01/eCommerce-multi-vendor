
const asyncHandler = require('express-async-handler');

const User = require("../models/userModels");
const Verif = require("../models/verifModels");

const sendEmail = require('./emailCtrls');
const { v4 } = require("uuid");


const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        let slug = v4()
        user = await User.create({
            slug,
            username,
            email,
            password,
        });
        let otp = `${Math.floor(1000 + Math.random() * 9000)}`
        const activationCode = `your code ${otp}`;
        const data = {
            to: email,
            text: "hey User",
            subject: "activation",
            html: activationCode
        }

        sendEmail(data)
        let verif
        verif = await Verif.create({
            slug,
            otp,
            email,
        });
        return res.status(201).json({
            email,
            slug: verif.slug,
            message: "please check email to activation account"
        });
    } else {
        throw new Error("user already axists")
    }
});

const verification = asyncHandler(async (req, res) => {
    try {
        const { slug, otp } = req.body
        let findVerif = await Verif.findOne({ slug });
        if (!findVerif) throw new Error("please requees new otp")
        let user = await User.findOne({ email: findVerif.email });
        if (user) {
            if (findVerif.otp === otp) {
                await User.updateOne({ email: user.email }, { verified: true });
                await Verif.deleteMany({ slug });
                return res.status(201).json({
                    message: "user created"
                });
            } else {
                throw new Error("wrong otp")
            }
        } else {
            throw new Error("user already axists")
        }
    } catch (error) {
        throw new Error(error)
    }
});

const resendOtp = asyncHandler(async (req, res) => {
    try {
        const { slug } = req.body
        let user = await User.findOne({ slug });
        if (user) {
            let otp = `${Math.floor(1000 + Math.random() * 9000)}`
            const activationUrl = `your code ${otp}`;
            const data = {
                to: user.email,
                text: "hey User",
                subject: "activation",
                html: activationUrl
            }
            sendEmail(data)

            await Verif.deleteMany({ slug });
            let verif
            verif = await Verif.create({
                slug,
                otp,
                email: user.email,
            });
            return res.status(201).json({
                message: "resent otp success"
            });
        } else {
            throw new Error("user already axists")
        }
    } catch (error) {
        throw new Error(error)
    }
});

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email not found");
        }
        if (await user.comparePassword(password)) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                email: user.email,
                verified: user.verified,
                slug: user.slug,
                token: await user.generateJWT(),
            });
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        next(error);
    }
})

module.exports = {
    register, verification, resendOtp,login
}


const asyncHandler = require('express-async-handler');
const User = require("../models/userModels");
const Verif = require("../models/verifModels");
const sendEmail = require('./emailCtrls');
const { v4 } = require("uuid");
const crypto = require("crypto");

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

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("user not found with this email")
    try {
        const token = await user.createPasswordResetToken();
        await user.save()
        const resetURL = `hi please follow this link to reset your password this, link is valid till 10 minutes
        from now <a href='http://localhost:5173/change-password/${token}'> Clik here</a>`
        const data = {
            to: email,
            text: "hey User",
            subject: "forgot password link",
            html: resetURL
        }
        sendEmail(data)
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gte: Date.now() }
    })
    if (!user) throw new Error("token expired please try again later")
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
})

const loginGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                email: user.email,
                verified: user.verified,
                // admin: user.admin,
                token: await user.generateJWT(),
            });
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = generatedPassword;
            const newUser = new User({
                slug: v4(),
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.avatar,
                verified: true,
            });
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                avatar: newUser.avatar,
                username: newUser.username,
                email: newUser.email,
                verified: newUser.verified,
                // admin: newUser.admin,
                token: await newUser.generateJWT(),
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const allUser = await User.find({}).select('-password');
        return res.json(allUser);
    } catch (error) {
        next(error);
    }
};

const singleUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (user) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                username: user.username,
                email: user.email,
                // verified: user.verified,
                admin: user.admin,
            });
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    verification,
    resendOtp,
    login,
    forgotPassword,
    resetPassword,
    loginGoogle,
    getAllUser,
    singleUser
}


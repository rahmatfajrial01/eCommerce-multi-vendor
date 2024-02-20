const { verify } = require("jsonwebtoken");
const User = require("../models/userModels");

const authGuard = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(id).select("-password");
            next();
        } catch (error) {
            let err = new Error("Not authorized, Token failed");
            err.statusCode = 401;
            next(err);
        }
    } else {
        let error = new Error("Not authorized, No token");
        error.statusCode = 401;
        next(error);
    }
};

const adminGuard = (req, res, next) => {
    if (req.user && req.user.role === 3) {
        next();
    } else {
        let error = new Error("Not authorized as an admin");
        error.statusCode = 401;
        next(error);
    }
};

const sellerGuard = (req, res, next) => {
    if (req.user && req.user.role >= 2) {
        next();
    } else {
        let error = new Error("Not authorized as an seller");
        error.statusCode = 401;
        next(error);
    }
};

module.exports = { authGuard, adminGuard, sellerGuard }


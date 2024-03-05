const Order2 = require("../models/order2Models");

const getOrder2 = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const order2 = await Order2.find({ user: _id })
        return res.json(order2);
    } catch (error) {
        next(error);
    }
};
const getOrder2ByShope = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const order2 = await Order2.find({ user: _id })
        return res.json(order2);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrder2, getOrder2ByShope
}
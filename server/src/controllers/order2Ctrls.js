const Order2 = require("../models/order2Models");

const getOrder2 = async (req, res, next) => {
    try {
        const { _id } = req.user;
        let where = { user: _id }
        if (req.query.orderStatus) {
            where = { user: _id, orderStatus: req.query.orderStatus }
        }
        const order2 = await Order2.find(where)
        return res.json(order2);
    } catch (error) {
        next(error);
    }
};
const getOrder2ByShope = async (req, res, next) => {
    try {
        let where = {}
        if (req.query.orderStatus) {
            where = { orderStatus: req.query.orderStatus }
        }
        const order2 = await Order2.find(where).populate([
            {
                path: "user",
                select: ["username"],
            }
        ])
        return res.json(order2);
    } catch (error) {
        next(error);
    }
};
const changeOrderStatus = async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const order2 = await Order2.findByIdAndUpdate(
            id,
            {
                orderStatus: status
            },
            {
                new: true
            }
        )
        return res.json(order2);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrder2, getOrder2ByShope, changeOrderStatus
}
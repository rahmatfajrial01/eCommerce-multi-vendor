const Order2 = require("../models/order2Models");

const getOrder2 = async (req, res, next) => {
    try {
        const { _id } = req.user;
        let where = { user: _id }

        if (req.query.orderStatus) {
            where = { user: _id, orderStatus: req.query.orderStatus }
        }
        let order2 = await Order2.find(where)
        let p = []
        let unpaidItem = order2.filter(item => item.orderStatus === 'Unpaid')

        let unique = [...new Set(unpaidItem.map(p => p.orderId.toString()))]
        for (let i = 0; i < unique.length; i++) {
            for (let j = 0; j < unpaidItem.length; j++) {
                if (unique[i] === unpaidItem[j].orderId.toString()) {
                    p[i] = {
                        orderId: unique[i],
                        payInfo: unpaidItem[i].payInfo,
                        order: p[i] &&
                            [
                                // ...p[i].order,
                                unpaidItem[j]
                            ]
                        // :
                        // [
                        //     unpaidItem[j]
                        // ]
                    }

                }
            }
        }
        return res.json({ order2, order2Unpaid: p });
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